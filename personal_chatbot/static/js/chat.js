let chatHistory = [];

// Load chat history from localStorage
function loadChatHistory() {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
        chatHistory = JSON.parse(saved);
        displayChatHistory();
    }
}

// Save chat history to localStorage
function saveChatHistory() {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Display chat history
function displayChatHistory() {
    const historyDiv = document.getElementById('chatHistory');
    historyDiv.innerHTML = '';
    
    chatHistory.forEach(chat => {
        if (chat.user) {
            addMessageToChat('user', chat.user, chat.timestamp);
        }
        if (chat.bot) {
            addMessageToChat('bot', chat.bot, chat.timestamp);
        }
    });
    
    // Scroll to bottom
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add message to chat display
function addMessageToChat(type, message, timestamp) {
    const chatHistoryDiv = document.getElementById('chatHistory');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const time = timestamp ? 
        new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 
        new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageDiv.innerHTML = `
        <div>${message}</div>
        <div class="message-time">${time}</div>
    `;
    
    chatHistoryDiv.appendChild(messageDiv);
    
    // Scroll to bottom
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show loading indicator
function showLoading() {
    const chatHistoryDiv = document.getElementById('chatHistory');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message loading-message';
    loadingDiv.id = 'loadingMessage';
    loadingDiv.innerHTML = `
        <div>AI is thinking</div>
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    chatHistoryDiv.appendChild(loadingDiv);
    
    // Scroll to bottom
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove loading indicator
function removeLoading() {
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

// Set quick message
function setQuickMessage(message) {
    const input = document.getElementById('chatInput');
    input.value = message;
    input.focus();
}

// Clear chat
function clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        chatHistory = [];
        saveChatHistory();
        document.getElementById('chatHistory').innerHTML = '';
        
        // Restore welcome message
        const welcome = document.querySelector('.welcome-message');
        if (welcome) {
            welcome.style.display = 'block';
        }
    }
}

// Handle message sending
function sendMessage() {
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const userMessage = input.value.trim();
    
    if (!userMessage) return;
    
    // Hide welcome message if visible
    const welcome = document.querySelector('.welcome-message');
    if (welcome && welcome.style.display !== 'none') {
        welcome.style.display = 'none';
    }
    
    // Add user message to chat
    const timestamp = Date.now();
    addMessageToChat('user', userMessage, timestamp);
    
    // Add to chat history
    chatHistory.push({
        user: userMessage,
        timestamp: timestamp
    });
    saveChatHistory();
    
    // Clear input and disable send button
    input.value = '';
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<span>Sending...</span><span>⏳</span>';
    
    // Show loading indicator
    showLoading();
    
    // Submit to backend
    const formData = new FormData();
    formData.append('input', userMessage);
    
    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(html => {
        removeLoading();
        
        // Parse the response to get the bot message
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Look for the response in the parsed HTML
        const responseElement = doc.querySelector('.bot-response');
        let botResponse;
        
        if (responseElement) {
            botResponse = responseElement.textContent.trim();
        } else {
            // Fallback: look for any text content that might be the response
            const bodyText = doc.body.textContent;
            if (bodyText && bodyText.trim() && !bodyText.includes('Personal AI Assistant')) {
                botResponse = bodyText.trim();
            } else {
                botResponse = 'I received your message but encountered an issue with the response format.';
            }
        }
        
        addMessageToChat('bot', botResponse);
        chatHistory[chatHistory.length - 1].bot = botResponse;
        saveChatHistory();
    })
    .catch(error => {
        removeLoading();
        console.error('Error:', error);
        const errorMsg = 'Sorry, I encountered a network error. Please check your connection and try again.';
        addMessageToChat('bot', errorMsg);
        chatHistory[chatHistory.length - 1].bot = errorMsg;
        saveChatHistory();
    })
    .finally(() => {
        // Re-enable send button
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<span>Send</span><span>📤</span>';
        input.focus();
    });
}

// Initialize the chat application
function initializeChat() {
    loadChatHistory();
    
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (chatInput) {
        chatInput.focus();
        
        // Handle Enter key press
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
}

// Load chat history and setup event listeners when page loads
document.addEventListener('DOMContentLoaded', initializeChat);
window.addEventListener('load', initializeChat);
