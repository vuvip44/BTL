const express = require('express');
const router = express.Router();
const userController=require('../controller/AuthController');

// Đăng ký người dùng
router.post('/signup', userController.signup);

// Đăng nhập người dùng
router.post('/login', userController.login);



module.exports = router;