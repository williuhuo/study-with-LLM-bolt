from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class KnowledgePointBase(BaseModel):
    title: str
    description: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    difficulty_level: int = 1

class KnowledgePointCreate(KnowledgePointBase):
    document_id: Optional[int] = None
    tags: Optional[List[str]] = []

class KnowledgePointUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    difficulty_level: Optional[int] = None
    mastery_level: Optional[float] = None
    tags: Optional[List[str]] = None

class KnowledgePointResponse(KnowledgePointBase):
    id: int
    mastery_level: float
    times_reviewed: int
    last_reviewed: Optional[datetime] = None
    tags: List[str]
    user_id: int
    document_id: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True