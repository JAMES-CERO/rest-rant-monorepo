// Modules and Globals
import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';

import cors from 'cors'
const app: Application = express();
import cookieSession from 'cookie-session';
const defineCurrentUser = require('./middleware/defineCurrentUser');

// Express Settings
app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET!],
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 
}))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json()); // Use the built-in middleware for parsing JSON bodies
app.use(defineCurrentUser)

// Controllers & Routes

app.use(express.urlencoded({ extended: true }))

app.use('/places', require('./controllers/places'))
app.use('/users', require('./controllers/users'))
app.use('/authentication', require('./controllers/authentication'))

// Listen for Connections
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})