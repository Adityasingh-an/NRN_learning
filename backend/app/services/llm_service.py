import logging
from openai import OpenAI
from app.core.config import settings

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# System instructions to shape the AI's behavior
SYSTEM_PROMPT = """
You are the "NRN Smart Learning" AI Tutor.
You are a brilliant, encouraging, and highly advanced multimodal tutor.
Your goal is to help students learn effectively. 
Keep your answers engaging, clear, avoiding extreme length unless asked for detail.
Do NOT output Markdown headers unless absolutely needed. Be conversational.
"""

def generate_tutor_response(user_message: str) -> str:
    """
    Sends the user message to OpenRouter API combining OpenAI's client framework.
    """
    if not settings.OPENROUTER_API_KEY:
         logger.warning("OPENROUTER_API_KEY is missing!")
         return "Please set your OPENROUTER_API_KEY in the backend/.env file to start chatting!"

    try:
        # Initialize OpenAI Client but route it physically to OpenRouter's base URL
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=settings.OPENROUTER_API_KEY,
        )

        logger.info(f"Sending prompt to OpenRouter: {user_message[:50]}...")
        
        # Using OpenRouter's Universal Free Routing Endpoint
        # This automatically finds an online free model so it never hits a 404
        completion = client.chat.completions.create(
          model="openrouter/free",
          messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message}
          ],
          temperature=0.7,
        )
        
        return completion.choices[0].message.content
        
    except Exception as e:
        logger.error(f"Error calling OpenRouter API: {str(e)}")
        raise e
