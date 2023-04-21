const mongoose = require('mongoose');
const { Schema } = mongoose;

const watchListSchema = new Schema({
    userId: String,
    data: Object
})
const WatchList = mongoose.model('WatchList', watchListSchema,);
const getWatchList = async (user) => {
    const list = await WatchList.findOne({ userId: user.id });
    return list || { data: [] };
}
const updateWatchList = async ({ body }) => {
    try {
        const { userId, data } = body;
        console.log('id', userId);
        const exist = await WatchList.findOne({ userId: userId });
        console.log('exist', exist);
        if (exist) {
            let watchList = [...exist?.data] || [];
            let watchItem = watchList.find((item) => {
                return item.id === data.id;
            })

            if (watchItem) {
                watchList = watchList.filter((item) => {
                    return item.id !== data.id;
                })
            } else {
                watchList.push(data);
            }
            console.log('final check ', watchList);
            const obj = await WatchList.findOneAndUpdate({ userId: userId }, { data: watchList });
            console.log('updated watchList', obj);
            return { message: "WishList updated successfully", list: watchList };
        }
        const obj = await WatchList.create({ userId: userId, data: [data] });
        console.log('created watchList', obj);
        return { message: "WishList updated successfully", list: [data] };
    } catch (error) {
        console.log(error);
    }

}


module.exports = { WatchList, updateWatchList, getWatchList };