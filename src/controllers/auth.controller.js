const express = require('express');
const { loginUser, registerUser } = require('../models/user.model');
const authRouter = express.Router();
const { generateToken, generateOtp } = require('../services/auth.services');

authRouter.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        console.log('Session ID:', req.session.id);
        res.cookie('connect.sid', req.session.id);
        let user = await loginUser({ body: req.body });
        if (!user) user = await registerUser({ body: req.body });
        let otp = await generateOtp();
        let token = generateToken(user);
        console.log("user: ", user);
        console.log("token: ", token);
        console.log("otp: ", otp);
        console.log('Session', req.session);
        let views = req.session.views;
        console.log('views', views);
        if (views) {
            req.session.views = views + 1;
        } else {
            req.session.views = 1;
        }
        res.send({ token, user, otp });
        // res.send(`You have visited this page ${req.session.views} times`);
    } catch (error) {
        console.error('error', error);
    }
})
authRouter.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        let user = await registerUser({ body: req.body });
        console.log("user: ", user);
        let token = generateToken(user);
        console.log("token: ", token);
        res.send({ token, user });
    } catch (error) {
        console.error('error', error);
    }
})
authRouter.get('/logout', (req, res) => {
    console.log('umm', req.session);
    console.log('Received logout request with headers:', req.headers);
    console.log('Session ID:', req.session.id);
    const sessionId = req.cookies['connect.sid'];
    try {
        req.session.destroy((err) => {
            if (err)
                console.log('error', err);
            else
                res.send(`User logged out successfully`);
        });
    } catch (error) {
        console.error('error', error);
        res.status(401).send(`Error logging out ${error}`);
    }
})
authRouter.get('/sessions', (req, res) => {
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


module.exports = { authRouter };