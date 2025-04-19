class Chat {
    constructor() {
        this.socket = io();
        this.currentChat = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Unirse a un chat
        this.socket.on('connect', () => {
            if (this.currentChat) {
                this.socket.emit('join-chat', this.currentChat);
            }
        });

        // Recibir mensajes
        this.socket.on('receive-message', (data) => {
            this.appendMessage(data);
        });
    }

    joinChat(chatId) {
        this.currentChat = chatId;
        this.socket.emit('join-chat', chatId);
    }

    sendMessage(message) {
        if (!this.currentChat) return;

        const user = JSON.parse(localStorage.getItem('user'));
        
        this.socket.emit('send-message', {
            chatId: this.currentChat,
            sender: user.id,
            message: message
        });

        // Enviar mensaje al servidor
        fetch(`/api/chat/${this.currentChat}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ content: message })
        })
        .catch(error => console.error('Error enviando mensaje:', error));
    }

    appendMessage(data) {
        const chatMessages = document.getElementById('chatMessages');
        const user = JSON.parse(localStorage.getItem('user'));
        const isCurrentUser = data.sender === user.id;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isCurrentUser ? 'sent' : 'received'}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${data.message}</p>
                <span class="message-time">${new Date(data.timestamp).toLocaleTimeString()}</span>
            </div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    loadChatHistory(chatId) {
        fetch(`/api/chat/${chatId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(chat => {
            const chatMessages = document.getElementById('chatMessages');
            chatMessages.innerHTML = '';

            chat.messages.forEach(message => {
                this.appendMessage({
                    sender: message.sender,
                    message: message.content,
                    timestamp: message.timestamp
                });
            });
        })
        .catch(error => console.error('Error cargando historial:', error));
    }
}

// Inicializar chat cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const chat = new Chat();
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');

    if (messageForm) {
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = messageInput.value.trim();
            if (message) {
                chat.sendMessage(message);
                messageInput.value = '';
            }
        });
    }

    // Cargar historial si hay un chat activo
    const chatId = document.getElementById('chatId')?.value;
    if (chatId) {
        chat.joinChat(chatId);
        chat.loadChatHistory(chatId);
    }
}); 