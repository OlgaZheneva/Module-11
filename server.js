const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');

// Создайте Express приложение
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Обслуживание статических файлов
app.use(express.static(path.join(__dirname, 'public'))); // Укажите папку с вашими файлами

// Обработчик входящих WebSocket соединений
wss.on('connection', (ws) => {
    console.log('Новый клиент подключен');
    // Отправка приветственного сообщения новому клиенту
    ws.send('Добро пожаловать в чат!');

    // Обработчик получения сообщений от клиента
    ws.on('message', (message) => {
        console.log(`Получено сообщение: ${message}`);
        // Пересылка сообщения всем клиентам
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Обработка отключения клиента
    ws.on('close', () => {
        console.log('Клиент отключился');
    });
});

// Запуск сервера
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
