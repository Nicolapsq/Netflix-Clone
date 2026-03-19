require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Abilita CORS
app.use(cors());

// Rotte per le API
const usersRouter = require('./routers/userRouter');
const profilesRouter = require('./routers/profilesRouter');
const moviesRouter = require('./routers/moviesRouter');
const genresRouter = require('./routers/genresRouter');
const episodesRouter = require('./routers/episodesRouter');
const watchlistRouter = require('./routers/watchlistRouter');
const watchHistoryRouter = require('./routers/watchHistoryRouter');
const authRouter = require('./routers/authRouter');
const { authMiddleware } = require('./middlewares/authMiddlerware');
const {errorsHandler, notFound} = require('./middlewares/userMiddleware');


// registro il middleware per il body-parser
app.use(express.json());

// registro il middleware per i file statici
app.use(express.static('public'));

// rotte pubbliche
app.use('/auth', authRouter);
app.use('/movies', moviesRouter);
app.use('/genres', genresRouter);
app.use('/movies/:movieId/episode', episodesRouter);

// rotte protette
// authMiddleware
app.use('/users', authMiddleware, usersRouter);
app.use('/users/:userId/profiles', authMiddleware, profilesRouter);
app.use('/profiles/:id/watchlist', authMiddleware, watchlistRouter);
app.use('/profiles/:id/history', authMiddleware, watchHistoryRouter);

// Middleware per la gestione degli errori
app.use(errorsHandler);
app.use(notFound);

// Avvio del server
app.listen(port, () => {
console.log(`Server in ascolto su porta ${port}`)
});