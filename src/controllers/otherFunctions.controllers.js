const express = require('express');
const { saveContinueWatching, getContinueWatching } = require('../models/continueWatching.model');
const { updateWatchList, getWatchList } = require('../models/watchList.model');
const { updatePackage, updateParentalLockStatus, getUser } = require('../models/user.model');
const otherFunctionRouter = express.Router();
otherFunctionRouter.get('/get-details', async (req, res) => {
    try {
        let obj = await getUser(req.user);
        res.status(200).send(obj);
    } catch (error) {
        console.error('error', error);
        res.status(404).send(error.message);
    }
})
otherFunctionRouter.post('/update-plan', async (req, res) => {
    try {
        let obj = await updatePackage(req.user, req.body)
        res.status(200).send(obj);
    } catch (error) {
        console.error('error', error);
        res.status(404).send(error.message);
    }
})
otherFunctionRouter.get('/disable-parental-lock', async (req, res) => {
    try {
        let obj = await updateParentalLockStatus(req.user, false)
        res.status(200).send(obj);
    } catch (error) {
        console.error('error', error);
        res.status(404).send(error.message);
    }
})
otherFunctionRouter.get('/enable-parental-lock', async (req, res) => {
    try {
        let obj = await updateParentalLockStatus(req.user, true)
        res.status(200).send(obj);
    } catch (error) {
        console.error('error', error);
        res.status(404).send(error.message);
    }
})
otherFunctionRouter.get('/continue-watching', async (req, res) => {
    try {
        let obj = await getContinueWatching(req.user);
        res.status(200).send(obj);
    } catch (error) {
        console.error('error', error);
        res.status(404).send(error.message);
    }
})
otherFunctionRouter.get('/continue-watching', async (req, res) => {
    try {
        let obj = await getContinueWatching(req.user);
        res.status(200).send(obj);
    } catch (error) {
        console.error('error', error);
        res.status(404).send(error.message);
    }
})
otherFunctionRouter.post('/continue-watching', async (req, res) => {
    try {
        let obj = await saveContinueWatching({ body: req.body })
        res.status(200).send(obj);
    } catch (error) {
        console.error('error', error);
        res.status(404).send(error.message);
    }
})
otherFunctionRouter.post('/watch-list', async (req, res) => {
    try {
        let obj = await updateWatchList({ body: req.body })
        res.status(200).send(obj);
    } catch (error) {
        console.error('error', error);
        res.status(404).send(error.message);
    }
})
otherFunctionRouter.get('/watch-list', async (req, res) => {
    try {
        let obj = await getWatchList(req.user)
        res.status(200).send(obj);
    } catch (error) {
        console.error('error', error);
        res.status(404).send(error.message);
    }
})

module.exports = { otherFunctionRouter };