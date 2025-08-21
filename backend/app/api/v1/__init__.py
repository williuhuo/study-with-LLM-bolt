from fastapi import APIRouter

from . import auth, users, documents, knowledge_points, flashcards, exercises

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
api_router.include_router(knowledge_points.router, prefix="/knowledge-points", tags=["knowledge-points"])
api_router.include_router(flashcards.router, prefix="/flashcards", tags=["flashcards"])
api_router.include_router(exercises.router, prefix="/exercises", tags=["exercises"])