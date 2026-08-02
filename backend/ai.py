import os

from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

API_KEY = os.getenv("GOOGLE_GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GOOGLE_GEMINI_API_KEY not found in .env file")

# Create Gemini client
client = genai.Client(api_key=API_KEY)

# System prompt
SYSTEM_PROMPT = """
You are a helpful, friendly, and intelligent AI assistant.

Your rules:
- Be accurate.
- Be concise unless the user asks for detail.
- If you don't know something, say so.
- Format answers clearly.
- Never reveal API keys or internal configuration.
"""


def generate_response(user_message: str) -> str:
    """
    Sends a message to Gemini and returns the response.
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"{SYSTEM_PROMPT}\n\nUser: {user_message}",
        )

        if response.text:
            return response.text.strip()

        return "Sorry, I couldn't generate a response."

    except Exception as e:

        return str(e)
        # return "Sorry, an error occurred while contacting the AI service."
