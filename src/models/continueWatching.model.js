const mongoose = require('mongoose');
const { Schema } = mongoose;

const continueWatchingSchema = new Schema({
    userId: String,
    data: Object
})
const ContinueWatching = mongoose.model('ContinueWatching', continueWatchingSchema,);
const getContinueWatching = async (user) => {
    console.log("user: ukm ", user);
    const item = await ContinueWatching.findOne({ userId: user.id });
    return item || { data: {} };
}
const saveContinueWatching = async ({ body }) => {
    try {
        const { userId, data } = body;
        console.log('id', userId);
        const exist = await ContinueWatching.findOne({ userId: userId });
        console.log('exist', exist);
        if (exist) {
            const obj = await ContinueWatching.findOneAndUpdate({ userId: userId }, { data: data });
            console.log('updated', obj);
            return { message: 'updated last watched', data: data };
        }
        const obj = await ContinueWatching.create({ userId: userId, data: data });
        console.log('created', obj);
        return { message: 'updated last watched', data: data };
    } catch (error) {
        console.log(error);
    }

}


module.exports = { ContinueWatching, saveContinueWatching, getContinueWatching };