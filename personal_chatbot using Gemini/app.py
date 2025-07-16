from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os
import time
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Set your Gemini API key here or use environment variable
gemini_api_key = os.environ.get("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY environment variable is required")

def preprocess(user_input):
    prompt = f"""
    You are an intelligent, helpful, and polite AI assistant trained to answer any type of question.

    Your goals:
    - Provide clear, accurate, and helpful responses.
    - Answer in a conversational, friendly tone.
    - Be honest about what you know or don't know.
    - Break down complex topics if needed.
    - Support questions related to programming, math, science, history, language, career advice, tech support, and more.
    - If the user asks for code in any programming language, provide the code with correct indentation and formatting. Always use triple backticks (```) to format code blocks.

    Example questions you can answer:
    - "Explain how neural networks work in simple terms."
    - "How do I reverse a string in Python?"
    - "What's the capital of France?"
    - "Give me a workout plan for beginners."
    - "Summarize the latest tech news."
    - "Show me a Python function to sort a list."

    If the question is ambiguous, politely ask for clarification.

    Now, answer this question:
    {user_input}
    """

    genai.configure(api_key=gemini_api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text

@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('input', '')
    if not user_input:
        return jsonify({'error': 'No input provided'}), 400

    try:
        start_time = time.time()
        msg = preprocess(user_input)
        processing_time = time.time() - start_time
        return jsonify({
            'response': msg,
            'processing_time': f"{processing_time:.2f}s"
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)