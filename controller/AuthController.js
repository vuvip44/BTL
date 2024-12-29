// controllers/userController.js
const userService = require('../service/UserService');

// Đăng ký người dùng
exports.signup = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const user = await userService.createUser(name, username, password);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, tokens } = await userService.authenticateUser(username, password);

    // Lưu token vào cookie
    res.cookie('access_token', user.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000, // 1 giờ
    })

    res.status(200).json({ message: 'Đăng nhập thành công!', user });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}
