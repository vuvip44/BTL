const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

// Định nghĩa model User
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  access_token: {
    type: DataTypes.TEXT
  }
});

// Tạo bảng trong cơ sở dữ liệu nếu chưa tồn tại
sequelize.sync({ force: false })  // force: true sẽ xóa bảng cũ và tạo lại bảng mới
  .then(() => {
    console.log("Bảng User đã được tạo thành công!");
  })
  .catch((err) => {
    console.error("Lỗi khi tạo bảng User:", err);
  });

module.exports = User;
