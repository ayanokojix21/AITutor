import asyncio
import os
import hashlib
import io
import uuid
from pathlib import Path
from typing import Optional

from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from google.oauth2.credentials import Credentials

from app.core.config import settings
from app.core.exceptions import DriveAPIError, ProcessingError


class FileService:
    """Service for managing file downloads from Google Drive."""
    
    def __init__(self, credentials: Credentials):
        """
        Initialize service with Google credentials.
        
        Args:
            credentials: Valid Google Credentials object
        """
        self.drive_service = build('drive', 'v3', credentials=credentials)
        self.storage_dir = Path(settings.UPLOAD_DIR)
        self.storage_dir.mkdir(parents=True, exist_ok=True)
    
    async def download_file(
        self, 
        file_id: str, 
        file_name: str,
        user_id: str
    ) -> tuple[str, int, str]:
        """
        Download a file from Google Drive.
        
        Args:
            file_id: Google Drive file ID
            file_name: Original file name
            user_id: User ID (for organizing storage)
        
        Returns:
            (local_path, file_size_bytes, file_hash_sha256)
        """
        try:
            # All Google Drive API calls are synchronous — run in a thread
            # to avoid blocking the asyncio event loop during downloads.
            return await asyncio.to_thread(
                self._download_file_sync, file_id, file_name, user_id
            )
        except DriveAPIError:
            raise
        except Exception as e:
            raise DriveAPIError(f"Failed to download file {file_id}: {str(e)}")

    def _download_file_sync(
        self, file_id: str, file_name: str, user_id: str
    ) -> tuple:
        """Synchronous download — called via asyncio.to_thread()."""
        user_dir = self.storage_dir / user_id
        user_dir.mkdir(parents=True, exist_ok=True)

        unique_filename = f"{uuid.uuid4()}_{file_name}"
        local_path = user_dir / unique_filename

        self.drive_service.files().get(
            fileId=file_id, fields="name,mimeType,size"
        ).execute()

        request = self.drive_service.files().get_media(fileId=file_id)
        fh = io.BytesIO()
        downloader = MediaIoBaseDownload(fh, request)

        done = False
        while not done:
            status, done = downloader.next_chunk()

        with open(local_path, 'wb') as f:
            f.write(fh.getvalue())

        file_hash = self._calculate_hash(local_path)
        file_size = local_path.stat().st_size

        return str(local_path), file_size, file_hash
    
    async def get_file_metadata(self, file_id: str) -> dict:
        """
        Get file metadata from Google Drive.
        
        Returns:
            {
                "id": ...,
                "name": ...,
                "mimeType": ...,
                "size": ...,
                "webViewLink": ...
            }
        """
        try:
            return self.drive_service.files().get(
                fileId=file_id,
                fields="id,name,mimeType,size,webViewLink,createdTime,modifiedTime"
            ).execute()
        except Exception as e:
            raise DriveAPIError(f"Failed to get metadata for {file_id}: {str(e)}")
    
    def _calculate_hash(self, file_path: Path) -> str:
        """Calculate SHA-256 hash of a file."""
        sha256_hash = hashlib.sha256()
        with open(file_path, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()
    
    def detect_file_type(self, mime_type: str, file_name: str) -> str:
        """
        Detect normalized file type from MIME type and filename.
        
        Returns:
            "pdf", "video", "audio", "image", "text", or "unknown"
        """
        mime_lower = mime_type.lower() if mime_type else ""
        name_lower = file_name.lower()
        
        if "pdf" in mime_lower or name_lower.endswith(".pdf"):
            return "pdf"
        
        if "video" in mime_lower or any(name_lower.endswith(ext) for ext in [".mp4", ".avi", ".mov", ".mkv", ".webm"]):
            return "video"
        
        if "audio" in mime_lower or any(name_lower.endswith(ext) for ext in [".mp3", ".wav", ".m4a", ".ogg", ".aac"]):
            return "audio"
        
        if "image" in mime_lower or any(name_lower.endswith(ext) for ext in [".jpg", ".jpeg", ".png", ".gif", ".webp"]):
            return "image"
        
        if any(keyword in mime_lower for keyword in ["text", "document", "msword", "wordprocessing"]):
            return "text"
        
        return "unknown"
    
    def delete_file(self, local_path: str) -> bool:
        """
        Delete a file from local storage.
        
        Returns:
            True if deleted, False if file didn't exist
        """
        try:
            path = Path(local_path)
            if path.exists():
                path.unlink()
                return True
            return False
        except Exception as e:
            raise ProcessingError(f"Failed to delete file {local_path}: {str(e)}")