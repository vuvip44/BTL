const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const jwt = require('jsonwebtoken');
const authMiddeleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: "Token không được cung cấp hoặc không đúng định dạng!" });
}
const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Token không được cung cấp!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Thay bằng secret key của bạn
        req.user = decoded; // Lưu thông tin user vào request
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token đã hết hạn!" });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Token không hợp lệ!" });
        }
        res.status(500).json({ message: "Lỗi xác thực token!" });
    }
};

module.exports = authMiddeleware;