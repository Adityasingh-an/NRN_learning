from fastapi import APIRouter, HTTPException
from app.models.request_models import ChatRequest, ChatResponse
from app.services.llm_service import generate_tutor_response

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Receives user message and returns AI Tutor response.
    """
    try:
        # Pass the message to our AI logic layer
        reply_text = generate_tutor_response(request.message)
        
        # Format the response to match the exact requirements: {"reply": "AI answer"}
        return ChatResponse(reply=reply_text)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")
