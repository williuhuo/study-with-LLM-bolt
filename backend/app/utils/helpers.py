import uuid
import os
from pathlib import Path
from typing import List
from app.config import settings

def generate_unique_filename(original_filename: str) -> str:
    """Generate a unique filename while preserving the extension"""
    file_extension = Path(original_filename).suffix
    unique_id = str(uuid.uuid4())
    return f"{unique_id}{file_extension}"

def validate_file_type(filename: str) -> bool:
    """Validate if the file type is allowed"""
    file_extension = Path(filename).suffix.lower()
    return file_extension in settings.ALLOWED_FILE_TYPES

def ensure_upload_directory():
    """Ensure the upload directory exists"""
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

def format_file_size(size_bytes: int) -> str:
    """Format file size in human readable format"""
    if size_bytes == 0:
        return "0B"
    
    size_names = ["B", "KB", "MB", "GB"]
    i = 0
    while size_bytes >= 1024 and i < len(size_names) - 1:
        size_bytes /= 1024.0
        i += 1
    
    return f"{size_bytes:.1f}{size_names[i]}"

def clean_text(text: str) -> str:
    """Clean and normalize text content"""
    # Remove excessive whitespace
    lines = [line.strip() for line in text.split('\n')]
    lines = [line for line in lines if line]  # Remove empty lines
    return '\n'.join(lines)