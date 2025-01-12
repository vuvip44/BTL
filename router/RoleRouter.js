const express = require('express');
const router = express.Router();
const roleController=require('../controller/RoleController');
const authMiddleware = require('../middleware/auth');
const authorize = require('../middleware/Authorize');
// Tạo role mới
router.post('/create',authMiddleware,authorize(['ADMIN']), roleController.createRole);

module.exports = router;