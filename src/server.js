require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const Chatbot = require('./services/chatbot');
const Router = require('./routes');
const AuthMiddleware = require('./middlewares/auth');
const AuthService = require('./services/auth');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(logger('common'));

Chatbot(app);

const authService = AuthService(db);
const authMiddleware = AuthMiddleware(authService);
const router = Router(authMiddleware, authService, db);

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
