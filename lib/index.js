"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const firebaseAdmin = require("firebase-admin");
const chat_server_1 = require("./chat-server");
firebaseAdmin.initializeApp({
    databaseURL: "https://socket-2e1ee.firebaseio.com",
    projectId: "socket-2e1ee",
    storageBucket: "socket-2e1ee.appspot.com"
});
const app = new chat_server_1.ChatServer().getApp();
exports.app = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map