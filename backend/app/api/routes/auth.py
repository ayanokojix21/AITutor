from fastapi import APIRouter, Request, Depends, HTTPException, status
from fastapi.responses import RedirectResponse, JSONResponse
from app.services.google_auth import GoogleAuthService
from app.core.config import settings

router = APIRouter()
auth_service = GoogleAuthService()

@router.get("/login")
async def login(request: Request):
    auth_url, state = auth_service.get_login_url()
    request.session["oauth_state"] = state
    return RedirectResponse(auth_url)

@router.get("/callback")
async def callback(request: Request, code: str, state: str):
    if state != request.session.get("oauth_state"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid state parameter"
        )
    
    try:
        token_info = auth_service.exchange_code(code)
        # Store user info or token in session
        # In a real app, you would create/get a user in DB and issue a JWT
        # For now, we'll store the Google token info in session for simplicity in this phase
        
        # Verify user info
        user_info = auth_service.get_user_info(token_info)
        
        request.session["user"] = user_info
        request.session["token"] = token_info
        
        return JSONResponse(content={"message": "Login successful", "user": user_info})
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Authentication failed: {str(e)}"
        )

@router.get("/logout")
async def logout(request: Request):
    request.session.clear()
    return JSONResponse(content={"message": "Logged out"})

@router.get("/me")
async def get_current_user(request: Request):
    user = request.session.get("user")
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    return user
