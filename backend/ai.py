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


def build_conversation(history: list) -> str:
    """
    Builds a conversation string from the history list.
    Each entry in history is a dict with 'role' and 'content'.
    """

    conversation = ""

    for message in history:
        role = message.get("role")
        text = message.get("text", "").strip()

        if not text:
            continue

        if role == "user":
            conversation += f"User: {text}\n"

        elif role == "assistant":
            conversation += f"Assistant: {text}\n"

    return conversation.strip()


def generate_response(history: list) -> str:
    """
    Sends a message to Gemini and returns the response.
    """

    conversation = build_conversation(history)

    prompt = f"""
    {SYSTEM_PROMPT}

    Conversation:

    {conversation}

    Assistant:
    """

    try:
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt,
        )

        if response.text:
            return response.text.strip()

        return "Sorry, I couldn't generate a response."

    except Exception as e:

        print(f"Error while generating response: {e}")
        return "Sorry, an error occurred while contacting the AI service."
