# Feature: Conversation Memory

## Overview

The chatbot now supports **temporary conversation memory**, allowing it to remember previous messages during the current chat session.

Instead of sending only the user's latest message to the AI, the frontend sends the entire conversation history with every request. This enables the AI to understand follow-up questions and maintain context, providing a more natural conversational experience similar to ChatGPT.

---

## Motivation

Without conversation memory, every request is treated as an independent conversation.

Example:

**User**

> Who is Lionel Messi?

**AI**

> Lionel Messi is an Argentine professional footballer...

**User**

> Which club does he play for?

Without memory, the AI receives only:

```
User: Which club does he play for?
```

It has no context for who "he" refers to.

With conversation memory enabled, the AI receives:

```
User: Who is Lionel Messi?

Assistant: Lionel Messi is an Argentine professional footballer...

User: Which club does he play for?
```

The AI now understands that "he" refers to Lionel Messi.

---

# Objectives

- Maintain conversation context.
- Improve follow-up question understanding.
- Create a ChatGPT-like experience.
- Keep implementation simple.
- Avoid using a database.
- Store conversation only for the current session.

---

# Architecture

```
User
 │
 ▼
Frontend (script.js)
 │
 ├── Stores chat history
 ├── Displays messages
 └── Sends complete conversation
 │
 ▼
Flask Backend
 │
 ├── Receives history
 ├── Formats prompt
 └── Sends prompt to Gemini
 │
 ▼
Gemini API
 │
 ▼
Response
 │
 ▼
Frontend updates conversation
```

---

# Implementation

## Frontend Responsibilities

The frontend will:

- Store every user message.
- Store every AI response.
- Maintain conversation order.
- Send the full conversation history with each request.
- Continue saving messages in Local Storage.
- Clear history when the user presses **Clear Chat**.

---

## Backend Responsibilities

The backend will:

- Accept the conversation history.
- Build a structured prompt.
- Append the latest user message.
- Send the entire conversation to Gemini.
- Return only the latest AI response.

## Context Window Management

To prevent excessive token usage and maintain fast response times, the chatbot automatically starts a new conversation when the conversation history reaches a predefined limit.

Rather than sending an ever-growing conversation to the AI model, the system monitors the number of exchanged messages.

Once the configured limit is reached:

1. The current conversation is archived locally (future improvement).
2. The active conversation history is cleared.
3. A new conversation begins.
4. The user is informed that a new chat has been started.

This ensures:

- Lower token consumption
- Faster AI responses
- Reduced API costs
- Consistent performance
- Prevention of context window overflow

---

### Default Configuration

| Setting | Value |
|----------|------:|
| Maximum Messages | 40 (20 user + 20 assistant) |
| Action | Start a new conversation |
| User Notification | Yes |

---

# Request Format

## Previous Request

```json
{
    "message": "Hello AI"
}
```

---

## New Request

```json
{
    "history": [
        {
            "role": "user",
            "text": "Hello"
        },
        {
            "role": "assistant",
            "text": "Hello! How can I help you?"
        },
        {
            "role": "user",
            "text": "Who created Python?"
        }
    ]
}
```

---

# Response Format

```json
{
    "reply": "Python was created by Guido van Rossum in the late 1980s."
}
```

---

# Conversation Flow

```
User:
Tell me about Python.

↓

AI:
Python is a programming language.

↓

User:
Who created it?

↓

Frontend sends:

User:
Tell me about Python.

Assistant:
Python is a programming language.

User:
Who created it?

↓

Gemini understands that
"it" = Python.

↓

AI:
Python was created by Guido van Rossum.
```

---

# Session Scope

Conversation memory exists only during the current chat session.

It is cleared when:

- The user presses **Clear Chat**.
- Local Storage is removed.
- The browser storage is cleared.
- The target limit is reached.

No conversations are permanently stored.

---

# Benefits

- Natural conversations.
- Better follow-up questions.
- Improved contextual understanding.
- More human-like interactions.
- No database required.
- Lightweight implementation.
- Compatible with Gemini Flash models.

---

# Limitations

- Memory is temporary.
- Very long conversations may increase request size and token usage.
- The chatbot does not remember conversations across different devices or browsers.
- Long-term memory is not included in this implementation.

---

# Future Improvements

- Base the limit on token count
- Automatic context trimming for long chats.
- Dynamically trim older messages while preserving important context.
- switch to using the Gemini SDK's native multi-turn chat/session features
- Conversation summarization.
- Persistent user accounts.
- Cloud database storage.
- Store archived conversations.
- Multi-session conversation history.
- Conversation export.
- Search within chat history.
- Streaming AI responses.
- Multiple chat conversations.
- Allow users to resume previous chats.

---

# Version

**Feature Name:** Conversation Memory

**Version:** 1.0

**Status:** Planned