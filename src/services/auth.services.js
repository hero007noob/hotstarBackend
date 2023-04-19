const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = { id: user._id, email: user.email, phone: user.phone };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secret, options);
}
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        return null; // or throw an error, depending on your preference
    }
}

module.exports = { generateToken, verifyToken };