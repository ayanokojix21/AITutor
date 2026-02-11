from fastapi import APIRouter, Request, Depends, HTTPException, status
from app.services.classroom_service import ClassroomService

router = APIRouter()

def get_classroom_service(request: Request) -> ClassroomService:
    token_info = request.session.get("token")
    if not token_info:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated with Google"
        )
    return ClassroomService(token_info)

@router.get("/courses")
async def list_courses(service: ClassroomService = Depends(get_classroom_service)):
    try:
        courses = service.list_courses()
        return {"courses": courses}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/courses/{course_id}/work")
async def list_course_work(course_id: str, service: ClassroomService = Depends(get_classroom_service)):
    try:
        work = service.list_course_work(course_id)
        return {"courseWork": work}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/courses/{course_id}/work/{course_work_id}/materials")
async def get_materials(
    course_id: str, 
    course_work_id: str, 
    service: ClassroomService = Depends(get_classroom_service)
):
    try:
        materials = service.get_course_work_materials(course_id, course_work_id)
        return {"materials": materials}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
