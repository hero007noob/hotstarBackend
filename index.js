const express = require('express');
const { db } = require('./src/config/db');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { authRouter } = require('./src/controllers/auth.controller');
const { sessionConfig } = require('./src/middlewares/sessionConfig');
const { otherFunctionRouter } = require('./src/controllers/otherFunctions.controllers');
const { tokenVerification } = require('./src/middlewares/auth.middleware');
const cors = require('cors');
const port = 6970;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(sessionConfig);
app.use('/auth', authRouter)
app.use('/user', tokenVerification, otherFunctionRouter)


app.listen(port, async () => {
    try {
        await db();
        console.log('listening http://localhost:6970/', port);
    } catch (error) {
        console.log('error:', error);
    }
})

