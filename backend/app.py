from flask import Flask, request, jsonify
from flask_cors import CORS
from ai import generate_response

import os

app = Flask(__name__)

# Allow requests from your frontend
CORS(app)


@app.route("/")
def home():
    return jsonify({"message": "Simple AI Chatbot API", "status": "running"})


@app.route("/health")
def health():
    return jsonify({"status": "healthy"})


@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    if not data:
        return jsonify({"error": "No JSON received."}), 400

    message = data.get("message", "").strip()

    if not message:
        return jsonify({"error": "Message cannot be empty."}), 400

    try:
        reply = generate_response(message)

        return jsonify({"reply": reply})

    except Exception as e:

        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=os.environ.get("FLASK_ENV") == "development",
    )
