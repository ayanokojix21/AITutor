import uuid
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from pydantic import BaseModel, ConfigDict

from app.api.routes.auth import get_current_user
from app.core.database import get_db
from app.core.exceptions import ClassroomAPIError, DriveAPIError, to_http_exception
from app.services.google_auth import GoogleAuthService
from app.services.classroom_service import ClassroomService
from app.services.file_service import FileService
from app.models.database import User, Course, File

router = APIRouter()
auth_service = GoogleAuthService()

class CourseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    classroom_id: str
    name: str
    section: Optional[str] = None
    description: Optional[str] = None
    last_synced: Optional[datetime] = None
    sync_status: str
    total_files: int
    processed_files: int

class FileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    drive_id: str
    drive_name: str
    detected_type: Optional[str] = None
    processing_status: str
    file_size: Optional[int] = None

class SyncStatusResponse(BaseModel):
    course_id: str
    status: str
    message: str
    total_files: int
    downloaded_files: int

@router.get("/courses", response_model=List[CourseResponse])
async def list_courses(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    List all synced courses for the user.
    """
    result = await db.execute(
        select(Course).where(Course.user_id == user.id, Course.is_active == True)
    )
    courses = result.scalars().all()
    
    return [CourseResponse.model_validate(course) for course in courses]


@router.get("/courses/sync")
async def sync_courses_from_classroom(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Sync courses from Google Classroom.
    Creates/updates Course records in database.
    """
    try:
        creds = await auth_service.get_valid_credentials(db, user.id)
        
        classroom_service = ClassroomService(creds)
        
        classroom_courses = await classroom_service.list_courses()
        
        synced_courses = []
        
        for classroom_course in classroom_courses:
            result = await db.execute(
                select(Course).where(
                    Course.user_id == user.id,
                    Course.classroom_id == classroom_course['id']
                )
            )
            course = result.scalar_one_or_none()
            
            if course:
                course.name = classroom_course.get('name', 'Untitled Course')
                course.section = classroom_course.get('section')
                course.description = classroom_course.get('descriptionHeading')
                course.room = classroom_course.get('room')
                course.owner_id = classroom_course.get('ownerId')
                course.updated_at = datetime.now(timezone.utc)
            else:
                course = Course(
                    id=str(uuid.uuid4()),
                    user_id=user.id,
                    classroom_id=classroom_course['id'],
                    name=classroom_course.get('name', 'Untitled Course'),
                    section=classroom_course.get('section'),
                    description=classroom_course.get('descriptionHeading'),
                    room=classroom_course.get('room'),
                    owner_id=classroom_course.get('ownerId')
                )
                db.add(course)
            
            synced_courses.append(course)
        
        await db.flush()
        
        return {
            "message": f"Synced {len(synced_courses)} courses",
            "courses": [CourseResponse.model_validate(c) for c in synced_courses]
        }
    
    except ClassroomAPIError as e:
        raise to_http_exception(e)


@router.post("/courses/{course_id}/sync-files")
async def sync_course_files(
    course_id: str,
    background_tasks: BackgroundTasks,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Start background sync of course files.
    Downloads files from Drive and creates File records.
    """
    result = await db.execute(
        select(Course).where(Course.id == course_id, Course.user_id == user.id)
    )
    course = result.scalar_one_or_none()
    
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    course.sync_status = "syncing"
    await db.commit()
    
    background_tasks.add_task(
        _sync_course_files_background,
        user.id,
        course.id,
        course.classroom_id
    )
    
    return {
        "message": "File sync started in background",
        "course_id": course.id,
        "status": "syncing"
    }


@router.get("/courses/{course_id}/files", response_model=List[FileResponse])
async def list_course_files(
    course_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    List all files for a course.
    """
    result = await db.execute(
        select(Course).where(Course.id == course_id, Course.user_id == user.id)
    )
    course = result.scalar_one_or_none()
    
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    result = await db.execute(
        select(File).where(File.course_id == course_id, File.is_deleted == False)
    )
    files = result.scalars().all()
    
    return [FileResponse.model_validate(f) for f in files]

async def _sync_course_files_background(user_id: str, course_id: str, classroom_id: str):
    """
    Background task to sync course files.
    """
    from app.core.database import AsyncSessionLocal
    
    async with AsyncSessionLocal() as db:
        try:
            creds = await auth_service.get_valid_credentials(db, user_id)
            
            classroom_service = ClassroomService(creds)
            file_service = FileService(creds)
            
            classroom_files = await classroom_service.get_all_course_files(classroom_id)
            
            downloaded_count = 0
            
            for cf in classroom_files:
                if cf['drive_id'].startswith(('youtube_', 'link_')):
                    continue
                
                result = await db.execute(
                    select(File).where(
                        File.user_id == user_id,
                        File.drive_id == cf['drive_id']
                    )
                )
                existing_file = result.scalar_one_or_none()
                
                if existing_file:
                    continue  
                
                try:
                    local_path, file_size, file_hash = await file_service.download_file(
                        cf['drive_id'],
                        cf['drive_name'],
                        user_id
                    )
                    
                    detected_type = file_service.detect_file_type(cf['mime_type'], cf['drive_name'])
                    
                    new_file = File(
                        id=str(uuid.uuid4()),
                        user_id=user_id,
                        course_id=course_id,
                        drive_id=cf['drive_id'],
                        drive_name=cf['drive_name'],
                        mime_type=cf['mime_type'],
                        web_view_link=cf['web_view_link'],
                        local_path=local_path,
                        file_size=file_size,
                        file_hash=file_hash,
                        detected_type=detected_type,
                        processing_status="pending"
                    )
                    db.add(new_file)
                    downloaded_count += 1
                
                except DriveAPIError:
                    continue
            
            await db.execute(
                update(Course)
                .where(Course.id == course_id)
                .values(
                    sync_status="completed",
                    last_synced=datetime.now(timezone.utc),
                    total_files=len(classroom_files),
                    updated_at=datetime.now(timezone.utc)
                )
            )
            
            await db.commit()
        
        except Exception as e:
            await db.execute(
                update(Course)
                .where(Course.id == course_id)
                .values(
                    sync_status="failed",
                    sync_error=str(e),
                    updated_at=datetime.now(timezone.utc)
                )
            )
            await db.commit()