// Authentication middleware
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt');
const errorMessages = require('../constants/errorMessages');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: errorMessages.UNAUTHORIZED
            });
        }

        const decoded = jwt.verify(token, jwtConfig.secret);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: errorMessages.TOKEN_EXPIRED
            });
        }

        return res.status(401).json({
            success: false,
            message: errorMessages.TOKEN_INVALID
        });
    }
};

module.exports = authMiddleware;
