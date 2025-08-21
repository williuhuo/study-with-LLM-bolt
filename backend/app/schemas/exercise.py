from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.exercise import ExerciseType, DifficultyLevel

class ExerciseBase(BaseModel):
    title: str
    question: str
    exercise_type: ExerciseType
    difficulty: DifficultyLevel = DifficultyLevel.INTERMEDIATE

class ExerciseCreate(ExerciseBase):
    options: Optional[dict] = None
    correct_answer: Optional[str] = None
    explanation: Optional[str] = None
    hints: Optional[List[str]] = []
    tags: Optional[List[str]] = []
    category: Optional[str] = None

class ExerciseUpdate(BaseModel):
    title: Optional[str] = None
    question: Optional[str] = None
    user_answer: Optional[str] = None
    is_correct: Optional[bool] = None

class ExerciseResponse(ExerciseBase):
    id: int
    options: Optional[dict] = None
    explanation: Optional[str] = None
    hints: List[str]
    user_answer: Optional[str] = None
    is_correct: Optional[bool] = None
    attempts: int
    time_spent: Optional[int] = None
    tags: List[str]
    category: Optional[str] = None
    user_id: int
    created_at: datetime
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True