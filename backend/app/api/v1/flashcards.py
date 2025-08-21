from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta

from app.database import get_db
from app.dependencies import get_current_active_user
from app.models.user import User
from app.models.flashcard import Flashcard, ReviewStatus
from app.schemas.flashcard import FlashcardResponse, FlashcardCreate, FlashcardUpdate, FlashcardReview

router = APIRouter()

@router.post("/", response_model=FlashcardResponse)
async def create_flashcard(
    flashcard: FlashcardCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    db_flashcard = Flashcard(
        **flashcard.dict(),
        user_id=current_user.id,
        due_date=datetime.utcnow()
    )
    db.add(db_flashcard)
    db.commit()
    db.refresh(db_flashcard)
    return db_flashcard

@router.get("/", response_model=List[FlashcardResponse])
async def list_flashcards(
    skip: int = 0,
    limit: int = 100,
    due_only: bool = False,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    query = db.query(Flashcard).filter(Flashcard.user_id == current_user.id)
    
    if due_only:
        query = query.filter(Flashcard.due_date <= datetime.utcnow())
    
    flashcards = query.offset(skip).limit(limit).all()
    return flashcards

@router.get("/{flashcard_id}", response_model=FlashcardResponse)
async def get_flashcard(
    flashcard_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    flashcard = db.query(Flashcard).filter(
        Flashcard.id == flashcard_id,
        Flashcard.user_id == current_user.id
    ).first()
    
    if not flashcard:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Flashcard not found"
        )
    
    return flashcard

@router.post("/{flashcard_id}/review", response_model=FlashcardResponse)
async def review_flashcard(
    flashcard_id: int,
    review: FlashcardReview,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    flashcard = db.query(Flashcard).filter(
        Flashcard.id == flashcard_id,
        Flashcard.user_id == current_user.id
    ).first()
    
    if not flashcard:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Flashcard not found"
        )
    
    # Update review statistics
    flashcard.total_reviews += 1
    flashcard.last_review_score = review.score
    flashcard.last_reviewed = datetime.utcnow()
    
    if review.score >= 3:  # Correct answer
        flashcard.correct_reviews += 1
        flashcard.repetitions += 1
        
        # Update interval based on spaced repetition algorithm
        if flashcard.repetitions == 1:
            flashcard.interval = 1
        elif flashcard.repetitions == 2:
            flashcard.interval = 6
        else:
            flashcard.interval = int(flashcard.interval * flashcard.ease_factor)
        
        # Update ease factor
        flashcard.ease_factor = max(1.3, flashcard.ease_factor + (0.1 - (5 - review.score) * (0.08 + (5 - review.score) * 0.02)))
        
        # Set next due date
        flashcard.due_date = datetime.utcnow() + timedelta(days=flashcard.interval)
        flashcard.review_status = ReviewStatus.REVIEW
    else:  # Incorrect answer
        flashcard.repetitions = 0
        flashcard.interval = 1
        flashcard.due_date = datetime.utcnow() + timedelta(minutes=10)
        flashcard.review_status = ReviewStatus.RELEARNING
    
    db.commit()
    db.refresh(flashcard)
    return flashcard

@router.put("/{flashcard_id}", response_model=FlashcardResponse)
async def update_flashcard(
    flashcard_id: int,
    flashcard_update: FlashcardUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    flashcard = db.query(Flashcard).filter(
        Flashcard.id == flashcard_id,
        Flashcard.user_id == current_user.id
    ).first()
    
    if not flashcard:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Flashcard not found"
        )
    
    for field, value in flashcard_update.dict(exclude_unset=True).items():
        setattr(flashcard, field, value)
    
    db.commit()
    db.refresh(flashcard)
    return flashcard

@router.delete("/{flashcard_id}")
async def delete_flashcard(
    flashcard_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    flashcard = db.query(Flashcard).filter(
        Flashcard.id == flashcard_id,
        Flashcard.user_id == current_user.id
    ).first()
    
    if not flashcard:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Flashcard not found"
        )
    
    db.delete(flashcard)
    db.commit()
    
    return {"message": "Flashcard deleted successfully"}