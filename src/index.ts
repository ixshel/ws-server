import * as functions from 'firebase-functions';
import * as firebaseAdmin from 'firebase-admin';
import { ChatServer } from './chat-server';

firebaseAdmin.initializeApp({
    databaseURL: "https://socket-2e1ee.firebaseio.com",
    projectId: "socket-2e1ee",
    storageBucket: "socket-2e1ee.appspot.com"
});

const app = new ChatServer().getApp();

exports.app = functions.https.onRequest(app);
