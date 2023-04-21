const { User } = require('../models/user.model');
const authService = require('../services/auth.services');

async function tokenVerification(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }
        const decoded = authService.verifyToken(token);
        console.log("decoded: ", decoded);
        let user = await User.findById(decoded?.id);
        console.log("user: ", user);
        req.user = user;
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = decoded;
    } catch (error) {
        console.log('err', error);
    }
    next();
}

module.exports = { tokenVerification };