const express = require('express');
const { loginUser } = require('../models/user.model');
const authRouter = express.Router();
const { generateToken } = require('../services/auth.services');
authRouter.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        let user = await loginUser({ body: req.body });
        console.log("user: ", user);
        let token = generateToken(user);
        console.log("token: ", token);
        res.send({ token, user });
        // console.log('Session', req.session);
        // let views = req.session.views;
        // console.log('views', views);
        // if (views) {
        //     req.session.views = views + 1;
        // } else {
        //     req.session.views = 1;
        // }
        // res.send(`You have visited this page ${req.session.views} times`);
    } catch (error) {
        console.error('error', error);
    }
})
authRouter.get('/logout', (req, res) => {
    console.log('umm', req.session);
    try {
        req.session.destroy((err) => {
            res.send(err);
        });
        res.send(`User logged out successfully`);
    } catch (error) {
        console.error('error', error);
        res.status(401).send(`Error logging out ${error}`);
    }
})

module.exports = { authRouter };