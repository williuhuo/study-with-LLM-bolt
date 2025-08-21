from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Enum, Float, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from app.database import Base

class ExerciseType(str, enum.Enum):
    MULTIPLE_CHOICE = "multiple_choice"
    SHORT_ANSWER = "short_answer"
    ESSAY = "essay"
    PROBLEM_SOLVING = "problem_solving"
    CODE = "code"

class DifficultyLevel(str, enum.Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"

class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    question = Column(Text, nullable=False)
    
    # Exercise details
    exercise_type = Column(Enum(ExerciseType), nullable=False)
    difficulty = Column(Enum(DifficultyLevel), default=DifficultyLevel.INTERMEDIATE)
    
    # Content
    options = Column(Text)  # JSON for multiple choice options
    correct_answer = Column(Text)
    explanation = Column(Text)  # Solution explanation
    hints = Column(Text)  # JSON array of hints
    
    # User interaction
    user_answer = Column(Text)
    is_correct = Column(Boolean)
    attempts = Column(Integer, default=0)
    time_spent = Column(Integer)  # Seconds
    
    # Metadata
    tags = Column(Text)  # JSON array of tags
    category = Column(String)
    source = Column(String)  # Where the exercise came from
    
    # Foreign keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    completed_at = Column(DateTime(timezone=True))
    
    # Relationships
    user = relationship("User", back_populates="exercises")