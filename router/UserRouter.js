const express = require('express');
const router = express.Router();
const userController=require('../controller/AuthController');
const authMiddeleware = require('../middleware/auth');

// Đăng ký người dùng
router.post('/signup', userController.signup);

// Đăng nhập người dùng
router.post('/login', userController.login);

//
router.get("/protected", authMiddeleware, (req, res) => {
    res.json({ message: "Đã truy cập vào endpoint bảo vệ", userEmail: req.user.email,role:req.user.role });
});
module.exports = router;