const dotenv = require('dotenv');

// Sử dụng dotenv để load biến môi trường từ file .env
dotenv.config({ path: './.env' });
const jwt = require('jsonwebtoken');
const { asyncLocalStorage, RequestContext } = require('../util/RequestContext');
const authMiddeleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token không được cung cấp' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: 'Token không hợp lệ' });
        }

        // Gán thông tin user vào req.user
        req.user = {
            id: decodedToken.userId,
            email: decodedToken.userEmail,
            role: decodedToken.userRole, // Lưu role của user từ payload
        };

        next(); // Chuyển sang middleware hoặc route tiếp theo
    });
};

module.exports = authMiddeleware;