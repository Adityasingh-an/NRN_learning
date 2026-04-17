from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    message: str = Field(..., description="The user's query or question for the AI Tutor")

class ChatResponse(BaseModel):
    reply: str = Field(..., description="The AI's generated reply text")
