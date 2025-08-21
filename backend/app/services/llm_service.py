from typing import List, Dict, Optional
import openai
from app.config import settings

class LLMService:
    def __init__(self):
        openai.api_key = settings.OPENAI_API_KEY
    
    async def generate_summary(self, content: str, max_length: int = 500) -> str:
        """Generate a summary of the document content"""
        try:
            response = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that creates concise summaries of educational content."
                    },
                    {
                        "role": "user",
                        "content": f"Please create a concise summary of the following content in {max_length} characters or less:\n\n{content}"
                    }
                ],
                max_tokens=max_length // 4,  # Rough estimate
                temperature=0.3
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"Error generating summary: {e}")
            return "Summary generation failed"
    
    async def extract_knowledge_points(self, content: str) -> List[Dict[str, str]]:
        """Extract key knowledge points from content"""
        try:
            response = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an educational assistant that extracts key knowledge points from learning materials. Return a JSON array of objects with 'title', 'description', and 'category' fields."
                    },
                    {
                        "role": "user",
                        "content": f"Extract the main knowledge points from this content:\n\n{content}"
                    }
                ],
                max_tokens=1000,
                temperature=0.2
            )
            
            # Parse the response as JSON
            import json
            knowledge_points = json.loads(response.choices[0].message.content)
            return knowledge_points
        except Exception as e:
            print(f"Error extracting knowledge points: {e}")
            return []
    
    async def generate_flashcards(self, knowledge_point: str, count: int = 5) -> List[Dict[str, str]]:
        """Generate flashcards for a knowledge point"""
        try:
            response = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an educational assistant that creates effective flashcards for learning. Return a JSON array of objects with 'front' (question) and 'back' (answer) fields."
                    },
                    {
                        "role": "user",
                        "content": f"Create {count} flashcards to help learn about: {knowledge_point}"
                    }
                ],
                max_tokens=800,
                temperature=0.4
            )
            
            import json
            flashcards = json.loads(response.choices[0].message.content)
            return flashcards
        except Exception as e:
            print(f"Error generating flashcards: {e}")
            return []
    
    async def explain_concept(self, concept: str, context: str = "", user_level: str = "intermediate") -> str:
        """Provide an explanation of a concept"""
        try:
            system_prompt = f"You are a helpful tutor explaining concepts at a {user_level} level. Provide clear, engaging explanations."
            user_prompt = f"Explain this concept: {concept}"
            
            if context:
                user_prompt += f"\n\nContext: {context}"
            
            response = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                max_tokens=600,
                temperature=0.5
            )
            
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"Error explaining concept: {e}")
            return "Explanation generation failed"
    
    async def generate_exercises(self, topic: str, difficulty: str = "intermediate", count: int = 3) -> List[Dict]:
        """Generate practice exercises for a topic"""
        try:
            response = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": f"You are an educational assistant creating {difficulty} level practice exercises. Return a JSON array of objects with 'question', 'options' (for multiple choice), 'correct_answer', and 'explanation' fields."
                    },
                    {
                        "role": "user",
                        "content": f"Create {count} {difficulty} level exercises about: {topic}"
                    }
                ],
                max_tokens=1200,
                temperature=0.4
            )
            
            import json
            exercises = json.loads(response.choices[0].message.content)
            return exercises
        except Exception as e:
            print(f"Error generating exercises: {e}")
            return []