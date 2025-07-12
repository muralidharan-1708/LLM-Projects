# 🤖 Personal AI Chatbot

A modern, responsive web-based chatbot powered by Google's Gemini AI model. Built with Flask backend and vanilla JavaScript frontend, featuring a sleek chat interface with real-time messaging, typing indicators, and persistent chat history.

![Chatbot Interface](https://img.shields.io/badge/Interface-Modern%20Chat%20UI-blue)
![Python](https://img.shields.io/badge/Python-3.7+-green)
![Flask](https://img.shields.io/badge/Flask-2.x-lightgrey)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern Chat Interface**: WhatsApp/Telegram-style message bubbles
- **Smooth Animations**: Fade-in effects, typing indicators, and hover animations
- **Professional Styling**: Gradient backgrounds, rounded corners, and modern color scheme

### 🚀 **Advanced Chat Features**
- **Real-time Messaging**: Instant message delivery without page refresh
- **Typing Indicators**: Animated dots showing "AI is thinking..."
- **Message Timestamps**: Each message displays the time it was sent
- **Chat History Persistence**: Conversations saved in browser's local storage
- **Quick Action Buttons**: Pre-defined prompts for common questions
- **Clear Chat Function**: Easy way to reset conversation history

### 🧠 **AI Capabilities**
- **Powered by Google Gemini**: State-of-the-art AI model for intelligent responses
- **Multi-domain Support**: Programming, science, career advice, tech support, and more
- **Code Generation**: Properly formatted code blocks with syntax highlighting
- **Conversational Tone**: Friendly and helpful AI personality
- **Error Handling**: Graceful handling of API errors and network issues

### 🔧 **Technical Features**
- **AJAX Communication**: Seamless backend communication
- **Environment Variables**: Secure API key management
- **Error Recovery**: Network error handling and retry mechanisms
- **Performance Monitoring**: Response time tracking
- **Cross-browser Compatibility**: Works on all modern browsers

## 🏗️ Project Structure

```
personal_chatbot/
├── static/
│   ├── css/
│   │   └── style.css          # All styling and animations
│   └── js/
│       └── chat.js            # Frontend JavaScript logic
├── templates/
│   └── index.html             # Main HTML template
├── app.py                     # Flask backend application
├── requirements.txt           # Python dependencies
└── README.md                  # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Python 3.7 or higher
- Google Gemini API key
- Web browser (Chrome, Firefox, Safari, Edge)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd personal_chatbot
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Set Environment Variables
**Windows (PowerShell):**
```powershell
$env:GEMINI_API_KEY="your_actual_gemini_api_key_here"
```

**Windows (Command Prompt):**
```cmd
set GEMINI_API_KEY=your_actual_gemini_api_key_here
```

**macOS/Linux:**
```bash
export GEMINI_API_KEY="your_actual_gemini_api_key_here"
```

### 4. Run the Application
```bash
python app.py
```

### 5. Open in Browser
Navigate to `http://localhost:5000` in your web browser.

## 🔑 Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Set it as an environment variable (see step 3 above)

## 💻 Usage

### Basic Chat
1. Type your message in the input field
2. Press Enter or click the Send button
3. Watch the typing indicator while AI processes your request
4. See the response appear in the chat area

### Quick Actions
Use the pre-defined buttons for common questions:
- 🤖 **How AI works**: Learn about artificial intelligence
- 🐍 **Python help**: Get programming assistance
- 📰 **Tech news**: Ask about latest technology trends
- 💼 **Career tips**: Get professional development advice

### Chat Management
- **Clear Chat**: Click the 🗑️ button to reset conversation
- **Persistent History**: Your chats are automatically saved
- **Mobile Friendly**: Works perfectly on smartphones and tablets

## 🛠️ API Endpoints

### `GET /`
- **Description**: Serves the main chat interface
- **Response**: HTML page with chat UI

### `POST /chat`
- **Description**: Processes chat messages
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "input": "Your message here"
  }
  ```
- **Response**:
  ```json
  {
    "response": "AI response text",
    "processing_time": "1.23s"
  }
  ```

## 🎨 Customization

### Styling
Edit `static/css/style.css` to customize:
- Colors and themes
- Layout and spacing
- Animations and transitions
- Mobile responsiveness

### Functionality
Edit `static/js/chat.js` to modify:
- Message handling logic
- UI interactions
- Storage management
- Error handling

### AI Behavior
Edit `app.py` to customize:
- AI prompt and personality
- Response processing
- Error handling
- API configuration

## 🔒 Security Features

- **Environment Variables**: API keys stored securely outside source code
- **Input Validation**: Server-side validation of all user inputs
- **Error Handling**: Graceful handling of API failures and network issues
- **XSS Protection**: Safe HTML rendering and content sanitization

## 📱 Browser Compatibility

| Browser | Version | Status |
|---------|---------|---------|
| Chrome | 70+ | ✅ Fully Supported |
| Firefox | 65+ | ✅ Fully Supported |
| Safari | 12+ | ✅ Fully Supported |
| Edge | 79+ | ✅ Fully Supported |
| Mobile Safari | iOS 12+ | ✅ Fully Supported |
| Chrome Mobile | Android 7+ | ✅ Fully Supported |

## 🐛 Troubleshooting

### Common Issues

**1. "GEMINI_API_KEY environment variable is required"**
- Solution: Set the environment variable with your actual API key

**2. Network errors or timeouts**
- Check your internet connection
- Verify your API key is valid
- Try refreshing the page

**3. Chat history not saving**
- Enable localStorage in your browser
- Check if you're in incognito/private mode

**4. Mobile display issues**
- Clear browser cache
- Ensure you're using a supported browser version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for the powerful language model
- **Flask** for the lightweight web framework
- **Modern CSS/JS** for the responsive design patterns

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the [Google AI documentation](https://ai.google.dev/)
3. Open an issue in this repository

---

**Made with ❤️ by MD** | *Powered by Google Gemini AI*
