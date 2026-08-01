# Simple AI Chatbot

A lightweight AI chatbot built with **Python (Flask)** and **Google Gemini**, featuring a static frontend that can be deployed on **EdgeOne** and a Flask backend that can be deployed on **Render** or **Railway**.

---

## Features

- 🤖 AI-powered conversations
- ⚡ Fast and lightweight
- 📱 Responsive design
- 🌙 Modern dark theme
- 💾 Chat history stored in the browser
- 🔒 Secure API key (never exposed to users)
- 🚀 Easy deployment

---

## Requirements

- Python 3.10+
- Google Gemini API Key
- pip

---

## Installation

Clone the repository.

```bash
git clone https://github.com/adamu-joseph/simple-ai-chatbot

cd simple-ai-chatbot/backend
```

---

## Create a Virtual Environment

### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Environment Variables

Create a `.env` file from `.env.example`.

```
GEMINI_API_KEY=YOUR_API_KEY
```

---

## Running the Backend

```bash
python app.py
```

The API will start at:

```
http://127.0.0.1:5000
```

---

## API Endpoints

### Home

```
GET /
```

Returns

```json
{
    "message":"Simple AI Chatbot API",
    "status":"running"
}
```

---

### Health Check

```
GET /health
```

Returns

```json
{
    "status":"healthy"
}
```

---

### Chat

```
POST /chat
```

Request

```json
{
    "message":"Hello AI"
}
```

Response

```json
{
    "reply":"Hello! How can I help you today?"
}
```

---

## Frontend

Open the `frontend` folder.

Update the API URL inside:

```
script.js
```

Replace

```javascript
const API_URL = "https://your-api.onrender.com/chat";
```

with your deployed backend URL.

---

## Deployment

### Backend

Deploy the `backend` folder to:

- Render
- Railway

Build Command

```bash
pip install -r requirements.txt
```

Start Command

```bash
gunicorn app:app
```

Add the following environment variable:

```
GEMINI_API_KEY=YOUR_API_KEY
```

---

### Frontend

Upload the contents of the `frontend` folder to EdgeOne.

No server is required.

---

## Technologies Used

- Python
- Flask
- Gunicorn
- Google Gemini API
- HTML
- CSS
- JavaScript

---

## Future Improvements

- CI/CD pipeline 
- Streaming AI responses
- Markdown rendering
- Code syntax highlighting
- Multiple AI models
- User authentication
- Chat export
- Conversation memory
- Image generation
- Voice input
- File uploads

---

## License

MIT License

---

## Author

Adamu Joseph Ohigwere

LinkedIn: www.linkedin.com/in/adamujosephohigwere1

Built with ❤️ using Python, Flask, and Google Gemini.