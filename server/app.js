require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// импорт роутов
const userRouter = require('./routes/user.route');
const gameRouter = require('./routes/game.route');
const profileRouter = require('./routes/profile.route');

const app = express();

const PORT = process.env.PORT || 3001;
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:3001'],
}));

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  store: new FileStore(),
  httpOnly: true,
  secret: process.env.SECRET || 'kshfiugkkshsnfl',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false },
}));

// app.use пути
app.use('/', userRouter);
app.use('/game', gameRouter);
app.use('/profile', profileRouter);

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
