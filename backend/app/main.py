from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from app.core.config import settings

from app.api.routes import auth, classroom

def create_application() -> FastAPI:
    application = FastAPI(
        title=settings.PROJECT_NAME,
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
    )

    # Set all CORS enabled origins
    if settings.BACKEND_CORS_ORIGINS:
        application.add_middleware(
            CORSMiddleware,
            allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    
    # Session Middleware for OAuth
    application.add_middleware(
        SessionMiddleware, 
        secret_key=settings.SECRET_KEY, 
        https_only=False  # Set to True in production
    )

    application.include_router(auth.router, prefix="/auth", tags=["auth"])
    application.include_router(classroom.router, prefix="/classroom", tags=["classroom"])
    
    return application

app = create_application()

@app.get("/")
def root():
    return {"message": "Welcome to Rift Backend"}
