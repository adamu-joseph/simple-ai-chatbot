// ===============================
// Simple AI Chatbot
// script.js
// ===============================

// Change this after deploying your Flask backend
const API_URL = "https://simple-ai-chatbot-api.onrender.com/chat";

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const typingIndicator = document.getElementById("typingIndicator");

// ===============================
// Conversation Memory
// ===============================

let conversation = [];

// Maximum number of messages (user + assistant)
const MAX_MESSAGES = 40;

// ===============================
// Load Previous Chat
// ===============================

window.onload = () => {

    const history = localStorage.getItem("conversationHistory");

    if (!history) return;

    conversation = JSON.parse(history);

    conversation.forEach(message => {

        renderMessage(

            message.role === "user" ? "user" : "bot",
            message.text

        );

    });

};

// ===============================
// Save Chat
// ===============================

function saveChat() {

    localStorage.setItem(
        "conversationHistory",
        JSON.stringify(conversation)
    );

}

// ===============================
// Scroll Down
// ===============================

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ===============================
// Typing Indicator
// ===============================

function showTyping() {
    typingIndicator.classList.remove("hidden");
    scrollToBottom();
}

function hideTyping() {
    typingIndicator.classList.add("hidden");
}

// ===============================
// Add Message
// ===============================

function renderMessage(sender, text) {

    const message = document.createElement("div");
    message.className = `message ${sender}`;

    const avatar = sender === "user" ? "👤" : "🤖";

    message.innerHTML = `
        <div class="avatar">${avatar}</div>
        <div class="bubble"></div>
    `;

    message.querySelector(".bubble").textContent = text;

    chatBox.appendChild(message);

    scrollToBottom();

}

function addMessage(sender, text) {

    conversation.push({

        role: sender === "user" ? "user" : "assistant",
        text: text

    });

    renderMessage(sender, text);

    saveChat();

}

// ===============================
// Start New Conversation
// ===============================  

function startNewConversation() {

    // Clear conversation memory
    conversation = [];

    saveChat();

    // Clear chat window
    chatBox.innerHTML = "";

    // Display system message
    renderMessage(
        "bot",
        "🆕 A new conversation has started to maintain performance.\n\nHow can I help you today?"
    );

}

// ===============================
// Check Conversation Limit
// ===============================

function checkConversationLimit() {

    if (conversation.length >= MAX_MESSAGES) {

        startNewConversation();

    }

}

// ===============================
// Send Message
// ===============================

async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;

    // Start a new conversation if the limit has been reached
    checkConversationLimit();

    addMessage("user", message);

    userInput.value = "";
    userInput.style.height = "52px";

    showTyping();

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                history: conversation
            })

        });

        const data = await response.json();

        hideTyping();

        if (data.reply) {

            addMessage("bot", data.reply);

        } else {

            addMessage("bot", "Sorry, I couldn't understand the response.");

        }

    }

    catch (error) {

        hideTyping();

        addMessage(
            "bot",
            "Unable to connect to the AI server. Please try again later."
        );

        console.error(error);

    }

}

// ===============================
// Events
// ===============================

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function(e){

    if(e.key === "Enter" && !e.shiftKey){

        e.preventDefault();

        sendMessage();

    }

});

// ===============================
// Auto Resize Textarea
// ===============================

userInput.addEventListener("input", function(){

    this.style.height = "auto";

    this.style.height = this.scrollHeight + "px";

});

// ===============================
// Clear Chat
// ===============================

clearBtn.addEventListener("click", () => {

    if(confirm("Clear all chat history?")){

        localStorage.removeItem("conversationHistory");

        chatBox.innerHTML = `
            <div class="message bot">
                <div class="avatar">🤖</div>
                <div class="bubble">
                    Hello! 👋<br><br>
                    I'm your AI assistant.<br>
                    Ask me anything.
                </div>
            </div>
        `;

    }

});