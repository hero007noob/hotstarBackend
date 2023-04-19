const mongoose = require('mongoose');
const { Schema } = mongoose;

const devicesSchema = new Schema({
    userId: String,
    phone: String,
    count: Number,
})
const Devices = mongoose.model('Devices', devicesSchema,);

const saveDevices = async ({ body }) => {
    try {
        const { userId, data } = body;
        console.log('id', userId);
        const exist = await Devices.findOne({ userId: userId });
        console.log('exist', exist);
        if (exist) {
            const obj = await Devices.findOneAndUpdate({ userId: userId }, { data: data });
            console.log('updated', obj);
            return obj;
        }
        const obj = await Devices.create({ userId: userId, data: data });
        console.log('created', obj);
        return obj;
    } catch (error) {
        console.log(error);
    }

}


module.exports = { Devices, saveDevices };