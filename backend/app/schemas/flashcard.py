from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.flashcard import FlashcardType, ReviewStatus

class FlashcardBase(BaseModel):
    front: str
    back: str
    card_type: FlashcardType = FlashcardType.BASIC

class FlashcardCreate(FlashcardBase):
    knowledge_point_id: Optional[int] = None
    tags: Optional[List[str]] = []
    options: Optional[dict] = None

class FlashcardUpdate(BaseModel):
    front: Optional[str] = None
    back: Optional[str] = None
    tags: Optional[List[str]] = None
    notes: Optional[str] = None

class FlashcardResponse(FlashcardBase):
    id: int
    ease_factor: float
    interval: int
    repetitions: int
    review_status: ReviewStatus
    total_reviews: int
    correct_reviews: int
    due_date: Optional[datetime] = None
    last_reviewed: Optional[datetime] = None
    tags: List[str]
    user_id: int
    knowledge_point_id: Optional[int] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class FlashcardReview(BaseModel):
    score: int  # 1-5 scale
    time_spent: Optional[int] = None  # seconds