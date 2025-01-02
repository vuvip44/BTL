const sequelize = require('../config/db');
const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
(async () => {
  try {
    // Kiểm tra xem có roles ADMIN và USER chưa
    const adminRole = await Role.findOne({ where: { name: 'ADMIN' } });
    const userRole = await Role.findOne({ where: { name: 'USER' } });

    if (!adminRole || !userRole) {
      // Nếu không có, tạo lại roles
      await Role.bulkCreate([
        { name: 'ADMIN' },
        { name: 'USER' }
      ]);
      console.log('Roles đã được tạo.');
    }

    // Kiểm tra xem đã có user admin chưa
    const existingAdmin = await User.findOne({ where: { email: 'admin@gmail.com' } });
    const hashedPassword = await bcrypt.hash('123', 10);
    if (!existingAdmin) {
      // Nếu chưa có, tạo user admin
      await User.create({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword, // Mật khẩu phải mã hóa trong thực tế
        roleId: 1, // Role ADMIN
      });
      console.log('User admin đã được tạo.');
    } else {
      console.log('User admin đã tồn tại.');
    }

  } catch (error) {
    console.error('Lỗi:', error);
  }
})();
