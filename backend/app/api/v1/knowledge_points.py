from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.dependencies import get_current_active_user
from app.models.user import User
from app.models.knowledge_point import KnowledgePoint
from app.schemas.knowledge_point import KnowledgePointResponse, KnowledgePointCreate, KnowledgePointUpdate

router = APIRouter()

@router.post("/", response_model=KnowledgePointResponse)
async def create_knowledge_point(
    knowledge_point: KnowledgePointCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    db_knowledge_point = KnowledgePoint(
        **knowledge_point.dict(),
        user_id=current_user.id
    )
    db.add(db_knowledge_point)
    db.commit()
    db.refresh(db_knowledge_point)
    return db_knowledge_point

@router.get("/", response_model=List[KnowledgePointResponse])
async def list_knowledge_points(
    skip: int = 0,
    limit: int = 100,
    category: str = None,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    query = db.query(KnowledgePoint).filter(KnowledgePoint.user_id == current_user.id)
    
    if category:
        query = query.filter(KnowledgePoint.category == category)
    
    knowledge_points = query.offset(skip).limit(limit).all()
    return knowledge_points

@router.get("/{knowledge_point_id}", response_model=KnowledgePointResponse)
async def get_knowledge_point(
    knowledge_point_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    knowledge_point = db.query(KnowledgePoint).filter(
        KnowledgePoint.id == knowledge_point_id,
        KnowledgePoint.user_id == current_user.id
    ).first()
    
    if not knowledge_point:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Knowledge point not found"
        )
    
    return knowledge_point

@router.put("/{knowledge_point_id}", response_model=KnowledgePointResponse)
async def update_knowledge_point(
    knowledge_point_id: int,
    knowledge_point_update: KnowledgePointUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    knowledge_point = db.query(KnowledgePoint).filter(
        KnowledgePoint.id == knowledge_point_id,
        KnowledgePoint.user_id == current_user.id
    ).first()
    
    if not knowledge_point:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Knowledge point not found"
        )
    
    for field, value in knowledge_point_update.dict(exclude_unset=True).items():
        setattr(knowledge_point, field, value)
    
    db.commit()
    db.refresh(knowledge_point)
    return knowledge_point

@router.delete("/{knowledge_point_id}")
async def delete_knowledge_point(
    knowledge_point_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    knowledge_point = db.query(KnowledgePoint).filter(
        KnowledgePoint.id == knowledge_point_id,
        KnowledgePoint.user_id == current_user.id
    ).first()
    
    if not knowledge_point:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Knowledge point not found"
        )
    
    db.delete(knowledge_point)
    db.commit()
    
    return {"message": "Knowledge point deleted successfully"}