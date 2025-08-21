from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Float, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class KnowledgePoint(Base):
    __tablename__ = "knowledge_points"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    content = Column(Text)  # Detailed explanation
    
    # Learning progress
    mastery_level = Column(Float, default=0.0)  # 0.0 to 1.0
    times_reviewed = Column(Integer, default=0)
    last_reviewed = Column(DateTime(timezone=True))
    
    # Categorization
    category = Column(String)
    tags = Column(Text)  # JSON array of tags
    difficulty_level = Column(Integer, default=1)  # 1-5 scale
    
    # Relationships
    prerequisites = Column(Text)  # JSON array of prerequisite knowledge point IDs
    related_points = Column(Text)  # JSON array of related knowledge point IDs
    
    # Foreign keys
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    document_id = Column(Integer, ForeignKey("documents.id"))
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="knowledge_points")
    document = relationship("Document", back_populates="knowledge_points")
    flashcards = relationship("Flashcard", back_populates="knowledge_point")