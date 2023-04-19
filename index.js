const express = require('express');
const { db } = require('./src/config/db');
require('dotenv').config();
const { authRouter } = require('./src/controllers/auth.controller');
const { sessionConfig } = require('./src/middlewares/sessionConfig');
const { otherFunctionRouter } = require('./src/controllers/otherFunctions.controllers');
const { tokenVerification } = require('./src/middlewares/auth.middleware');

const port = 6970;
const app = express();

app.use(express.json());
app.use(sessionConfig);
app.use('/auth', authRouter)
app.use('/user', tokenVerification, otherFunctionRouter)
app.get('/', (req, res) => {
    const store = req.sessionStore;
    store.all((error, sessions) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(sessions);
        res.send(sessions);
    });
})

app.listen(port, async () => {
    try {
        await db();
        console.log('listening http://localhost:6970/', port);
    } catch (error) {
        console.log('error:', error);
    }
})

