# Conversation memory implementation

## High-Level Flow

User types a message
        │
        ▼
Frontend adds message to history
        │
        ▼
Frontend sends ALL history to Flask
        │
        ▼
Flask formats conversation
        │
        ▼
Gemini generates response
        │
        ▼
Frontend receives reply
        │
        ▼
Frontend stores AI reply
        │
        ▼
Conversation continues

**Note**:

The frontend owns the conversation memory.
The backend does not remember anything between requests.

## Step 1 — Create a conversation array

Instead of relying only on HTML stored in localStorage, create an array.

Each message becomes an object.

[
    {
        role: "user",
        text: "Hello"
    },
    {
        role: "assistant",
        text: "Hi!"
    },
    {
        role: "user",
        text: "Who created Python?"
    }
]

This is the real source of truth.

The HTML is only for display.

## Step 2 — Save conversation

Instead of only saving

chatBox.innerHTML

we will save

conversation

as JSON.

localStorage
    │
    ▼
conversationHistory

which contains

[
    {
        "role":"user",
        "text":"Hello"
    },
    {
        "role":"assistant",
        "text":"Hi!"
    }
]

## Step 3 — Load conversation

When the page opens

window.onload

read

conversationHistory

Then rebuild the chat UI.

Instead of saving HTML forever, we regenerate it.

conversation

↓

addMessage()

↓

HTML

This is much cleaner.

## Step 4 — Sending a message

Current request

{
    "message":"Hello"
}

New request

{
    "history":[
        {
            "role":"user",
            "text":"Hello"
        },
        {
            "role":"assistant",
            "text":"Hi!"
        },
        {
            "role":"user",
            "text":"Who created Python?"
        }
    ]
}

Notice there is no separate "message".

The latest user message is already inside the history.

## Step 5 — Flask receives history

Instead of

message = data["message"]

Flask does

history = data["history"]

Example

[
    {
        "role":"user",
        "text":"Hello"
    },
    {
        "role":"assistant",
        "text":"Hi!"
    }
]

## Step 6 — Build the prompt

Convert history into text.

System Prompt

User:
Hello

Assistant:
Hi!

User:
Who created Python?

Gemini now has context.

## Step 7 — Gemini replies

Gemini returns

Guido van Rossum created Python.
Step 8 — Update conversation

Frontend appends

{
    "role":"assistant",
    "text":"Guido van Rossum created Python."
}

Conversation becomes

User
Assistant
User
Assistant
User
Assistant

## Step 9 — Context limit

Suppose

MAX_MESSAGES = 40

Every time a message is added

conversation.length

is checked.

If

conversation.length >= 40

then

conversation = []

Display

──────────────
Previous conversation ended.

A new chat has started to maintain performance.
──────────────

Then continue normally.

## Final Architecture

Frontend
│
├── conversation[]
├── localStorage
├── HTML renderer
└── Sends history
          │
          ▼
Flask
│
├── Receives history
├── Builds prompt
└── Calls Gemini
          │
          ▼
Gemini
          │
          ▼
Reply
          │
          ▼
Frontend updates conversation[]

## Why this design?

This design has several advantages:

Stateless backend: Flask doesn't store user conversations, making it easier to scale and deploy.
Persistent user experience: Conversations survive page refreshes because they're stored in localStorage.
Simple implementation: No database or server-side session management is required.
Easy extensibility: In the future, we can replace localStorage with a database or add user authentication without changing how the frontend and backend communicate.