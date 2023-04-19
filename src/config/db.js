const mongoose = require('mongoose');
//Set up default mongoose connection
const mongoDB = 'mongodb+srv://himanshu:himanshu123@cluster0.sas5dix.mongodb.net/hotstar';
const db = async () => {
    await mongoose.connect(mongoDB);
    console.log('Connected to MongoDB')
}
module.exports = { db, mongoDB };