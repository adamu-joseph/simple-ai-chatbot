# Project Documentation

## Architecture

User
   │
   ▼
EdgeOne (HTML + CSS + JavaScript)
   │
   │ HTTPS
   ▼
Python Flask API (Render/Railway/Fly.io)
   │
   ▼
Google Gemini API
   │
   ▼
Response back to the user

## Technology Stack

Frontend: HTML, CSS, JavaScript (hosted on EdgeOne)
Backend: Python + Flask
AI: Google Gemini API (free tier)

## Deployment:

EdgeOne → Frontend
Render → Python API

## Features

💬 Modern chat interface
🤖 AI responses
📱 Responsive design
🌙 Dark theme
⌨️ Press Enter to send
⏳ "AI is typing..." indicator
🗑️ Clear chat button
💾 Chat history stored in the browser
⚡ Fast response

## Project Structure
simple-ai-chatbot/
│
├── backend/
│   ├── app.py
│   ├── ai.py
│   ├── requirements.txt
│   ├── .env.example
│   └── Procfile
│
└── frontend/
    ├── index.html
    ├── style.css
    ├── script.js
    └── logo.png
    
## Extra Features

Auto-scroll
Error handling
Loading animation
Mobile support
Nice chat bubbles
Markdown-style formatting for AI responses
Copy response button
API health check endpoint (/health)