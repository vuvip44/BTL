const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
require('dotenv').config();

// Mã hóa mật khẩu
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Tạo JWT access_token và refresh_token
const generateTokens = (user) => {
  
  const access_token = jwt.sign({ id:user.id, email: user.email, role: user.roleId}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  
  return { access_token };
};

// Đăng ký người dùng mới
async function createUser(name, email, password) {
  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    roleId: 2,
  });

  return newUser;
}

// Xác thực người dùng
async function authenticateUser(email, password) {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('Người dùng không tồn tại');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Sai mật khẩu');
  }

  // Tạo access_token và refresh_token
  const tokens = generateTokens(user);

  // Lưu refresh_token vào cơ sở dữ liệu
  await user.update({
    access_token: tokens.access_token,
  });

  return { user, tokens };
}

async function getUserById(id) {
  return await User.findByPk(id);
}

async function getUserByEmail(email) {
  return await User.findOne({ where: { email } });
}


module.exports = {
  createUser,
  authenticateUser,
  getUserById,
  getUserByEmail,
};
