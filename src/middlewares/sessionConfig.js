const { mongoDB } = require('../config/db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({ mongoUrl: mongoDB, collectionName: 'sessions', ttl: 60 * 60, autoRemoveInterval: 60, autoRemove: 'interval' }),
    cookie: { secure: false, httpOnly: false }
})

module.exports = { sessionConfig }