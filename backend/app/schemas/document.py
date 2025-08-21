from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.document import DocumentType, ProcessingStatus

class DocumentBase(BaseModel):
    title: str
    
class DocumentCreate(DocumentBase):
    pass

class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    summary: Optional[str] = None

class DocumentResponse(DocumentBase):
    id: int
    filename: str
    document_type: DocumentType
    processing_status: ProcessingStatus
    file_size: Optional[int] = None
    summary: Optional[str] = None
    language: Optional[str] = None
    page_count: Optional[int] = None
    owner_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    processed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class DocumentList(BaseModel):
    documents: List[DocumentResponse]
    total: int
    page: int
    size: int