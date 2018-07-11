"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const path = require("path");
const express = require("express");
const socketIo = require("socket.io");
class ChatServer {
    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    createApp() {
        this.app = express();
        this.app.use((require, response, next) => {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "X-Requested-With");
            response.header("Access-Control-Allow-Headers", "Content-Type");
            response.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            next();
        });
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.get('/status', (request, response) => {
            response.send({ message: "Ok" });
        });
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/index.html'));
        });
    }
    createServer() {
        this.server = http_1.createServer(this.app);
    }
    config() {
        this.port = process.env.PORT || ChatServer.PORT;
    }
    sockets() {
        this.io = socketIo(this.server, { origins: '*:*' });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port: %s', this.port);
        });
        this.io.on('connect', (socket) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('message', (m) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
    getApp() {
        return this.app;
    }
}
ChatServer.PORT = 8080;
exports.ChatServer = ChatServer;
//# sourceMappingURL=chat-server.js.map