const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    phone: { type: String },
    name: { type: String },
    email: { type: String },
    package: {
        plan: { type: String, required: true },
        price: { type: String },
        devices: { type: Number }
    },
    parentalLock: Boolean,
})
const User = mongoose.model('User', userSchema);


const loginUser = async ({ body }) => {
    const phone = body.phone;
    let user = await User.findOne({ phone: phone });
    if (!user) return null;
    return user;
}
const registerUser = async ({ body }) => {
    let user = await loginUser({ body: body });
    if (!user) user = await User.create(body);
    return user;
}
const getUser = async ({ id }) => {
    console.log("id: ", id);

    let user = await User.findById(id);
    console.log("user: ", user);
    return user;
}
const updatePackage = async (user, body) => {
    let updatedUser = await User.findByIdAndUpdate(user.id, { package: body.package });
    console.log("updatedUser: ", updatedUser);
    return { message: 'updated plan', data: body.package };
}
const updateParentalLockStatus = async (user, value) => {
    let updatedUser = await User.findByIdAndUpdate(user.id, { parentalLock: value });
    console.log("updatedUser: ", updatedUser);
    return { message: 'updated status', parentalLock: value };
}
module.exports = { User, loginUser, updatePackage, getUser, updateParentalLockStatus, registerUser };