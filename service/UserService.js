const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();

// Mã hóa mật khẩu
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Tạo JWT access_token và refresh_token
const generateTokens = (userId) => {
  const access_token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  
  return { access_token };
};

// Đăng ký người dùng mới
async function createUser(name, username, password) {
  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    name,
    username,
    password: hashedPassword,
  });

  return newUser;
}

// Xác thực người dùng
async function authenticateUser(username, password) {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new Error('Không tìm thấy người dùng');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Sai mật khẩu');
  }

  // Tạo access_token và refresh_token
  const tokens = generateTokens(user.id);

  // Lưu refresh_token vào cơ sở dữ liệu
  await user.update({
    access_token: tokens.access_token
  });

  return { user, tokens };
}



module.exports = {
  createUser,
  authenticateUser,
  
};
