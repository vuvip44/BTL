// controllers/userController.js
const userService = require('../service/UserService');

// Đăng ký người dùng
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await userService.getUserByEmail(email);
    if (existUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }
    const user = await userService.createUser(name, email, password);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Đăng nhập người dùng


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, tokens } = await userService.authenticateUser(email, password);

    res.status(200).json({ message: 'Đăng nhập thành công!', user, tokens });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

