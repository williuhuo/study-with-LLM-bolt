from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.database import get_db
from app.dependencies import get_current_active_user
from app.models.user import User
from app.models.exercise import Exercise
from app.schemas.exercise import ExerciseResponse, ExerciseCreate, ExerciseUpdate

router = APIRouter()

@router.post("/", response_model=ExerciseResponse)
async def create_exercise(
    exercise: ExerciseCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    db_exercise = Exercise(
        **exercise.dict(),
        user_id=current_user.id
    )
    db.add(db_exercise)
    db.commit()
    db.refresh(db_exercise)
    return db_exercise

@router.get("/", response_model=List[ExerciseResponse])
async def list_exercises(
    skip: int = 0,
    limit: int = 100,
    category: str = None,
    difficulty: str = None,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    query = db.query(Exercise).filter(Exercise.user_id == current_user.id)
    
    if category:
        query = query.filter(Exercise.category == category)
    
    if difficulty:
        query = query.filter(Exercise.difficulty == difficulty)
    
    exercises = query.offset(skip).limit(limit).all()
    return exercises

@router.get("/{exercise_id}", response_model=ExerciseResponse)
async def get_exercise(
    exercise_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    exercise = db.query(Exercise).filter(
        Exercise.id == exercise_id,
        Exercise.user_id == current_user.id
    ).first()
    
    if not exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Exercise not found"
        )
    
    return exercise

@router.put("/{exercise_id}/submit", response_model=ExerciseResponse)
async def submit_exercise(
    exercise_id: int,
    exercise_update: ExerciseUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    exercise = db.query(Exercise).filter(
        Exercise.id == exercise_id,
        Exercise.user_id == current_user.id
    ).first()
    
    if not exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Exercise not found"
        )
    
    # Update exercise with user's answer
    exercise.user_answer = exercise_update.user_answer
    exercise.attempts += 1
    
    # Check if answer is correct (simplified logic)
    if exercise.correct_answer and exercise_update.user_answer:
        exercise.is_correct = exercise.correct_answer.strip().lower() == exercise_update.user_answer.strip().lower()
    
    if exercise.is_correct:
        exercise.completed_at = datetime.utcnow()
    
    db.commit()
    db.refresh(exercise)
    return exercise

@router.delete("/{exercise_id}")
async def delete_exercise(
    exercise_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    exercise = db.query(Exercise).filter(
        Exercise.id == exercise_id,
        Exercise.user_id == current_user.id
    ).first()
    
    if not exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Exercise not found"
        )
    
    db.delete(exercise)
    db.commit()
    
    return {"message": "Exercise deleted successfully"}