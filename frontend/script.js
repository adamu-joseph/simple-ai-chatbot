// ===============================
// Simple AI Chatbot
// script.js
// ===============================

// Change this after deploying your Flask backend
const API_URL = "https://your-api.onrender.com/chat";

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const typingIndicator = document.getElementById("typingIndicator");

// ===============================
// Load Previous Chat
// ===============================

window.onload = () => {
    const history = localStorage.getItem("chatHistory");

    if (history) {
        chatBox.innerHTML = history;
        scrollToBottom();
    }
};

// ===============================
// Save Chat
// ===============================

function saveChat() {
    localStorage.setItem("chatHistory", chatBox.innerHTML);
}

// ===============================
// Scroll Down
// ===============================

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ===============================
// Add Message
// ===============================

function addMessage(sender, text) {

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
    saveChat();
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
// Send Message
// ===============================

async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;

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
                message: message
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

        localStorage.removeItem("chatHistory");

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