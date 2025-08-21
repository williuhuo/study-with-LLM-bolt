from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Enum, Float, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from app.database import Base

class FlashcardType(str, enum.Enum):
    BASIC = "basic"  # Question/Answer
    CLOZE = "cloze"  # Fill in the blank
    REVERSE = "reverse"  # Bidirectional
    MULTIPLE_CHOICE = "multiple_choice"

class ReviewStatus(str, enum.Enum):
    NEW = "new"
    LEARNING = "learning"
    REVIEW = "review"
    RELEARNING = "relearning"

class Flashcard(Base):
    __tablename__ = "flashcards"

    id = Column(Integer, primary_key=True, index=True)
    front = Column(Text, nullable=False)  # Question/Prompt
    back = Column(Text, nullable=False)   # Answer/Response
    
    # Card type and options
    card_type = Column(Enum(FlashcardType), default=FlashcardType.BASIC)
    options = Column(Text)  # JSON for multiple choice options, cloze hints, etc.
    
    # Spaced repetition algorithm data
    ease_factor = Column(Float, default=2.5)
    interval = Column(Integer, default=1)  # Days until next review
    repetitions = Column(Integer, default=0)
    review_status = Column(Enum(ReviewStatus), default=ReviewStatus.NEW)
    
    # Review statistics
    total_reviews = Column(Integer, default=0)
    correct_reviews = Column(Integer, default=0)
    last_review_score = Column(Integer)  # 1-5 scale
    
    # Scheduling
    due_date = Column(DateTime(timezone=True))
    last_reviewed = Column(DateTime(timezone=True))
    
    # Metadata
    tags = Column(Text)  # JSON array of tags
    notes = Column(Text)
    
    # Foreign keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    knowledge_point_id = Column(Integer, ForeignKey("knowledge_points.id"))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="flashcards")
    knowledge_point = relationship("KnowledgePoint", back_populates="flashcards")