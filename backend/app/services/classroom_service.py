from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

class ClassroomService:
    def __init__(self, token_info: dict):
        self.creds = Credentials(
            token=token_info["token"],
            refresh_token=token_info.get("refresh_token"),
            token_uri=token_info["token_uri"],
            client_id=token_info["client_id"],
            client_secret=token_info["client_secret"],
            scopes=token_info["scopes"]
        )
        self.service = build('classroom', 'v1', credentials=self.creds)

    def list_courses(self):
        results = self.service.courses().list(pageSize=10).execute()
        courses = results.get('courses', [])
        return courses

    def list_course_work(self, course_id: str):
        results = self.service.courses().courseWork().list(courseId=course_id).execute()
        course_work = results.get('courseWork', [])
        return course_work

    def get_course_work_materials(self, course_id: str, course_work_id: str):
        # Note: courseWork.get returns the specific course work object which contains materials
        # If looking for student submissions or attachments, logic might differ.
        # This gets the assignment details including materials.
        result = self.service.courses().courseWork().get(
            courseId=course_id, 
            id=course_work_id
        ).execute()
        return result.get('materials', [])
