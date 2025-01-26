const messageArea = document.getElementById('message-area');
const inputText = document.getElementById('input-text');
const sendButton = document.getElementById('send-button');

// Подключение к WebSocket серверу
const socket = new WebSocket('ws://localhost:8080');

// Обработка входящих сообщений
socket.onmessage = (event) => {
    displayMessage(event.data);
};

// Функция для отображения сообщения
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message; // Отображение текстовых сообщений
    messageArea.appendChild(messageElement);
    // Автопрокрутка области чата вниз
    messageArea.scrollTop = messageArea.scrollHeight;
}

// Отправка сообщения на сервер
sendButton.onclick = () => sendMessage();
inputText.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = inputText.value;
    if (message) {
        const formattedMessage = `Вы: ${message}`; // Форматирование сообщения
        socket.send(message); // Отправляем только текст на сервер
        displayMessage(formattedMessage); // Отображаем сообщение в чате
        inputText.value = ''; // Очищаем поле ввода
    }
}
