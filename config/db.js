const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Sử dụng dotenv để load biến môi trường từ file .env
dotenv.config({ path: './.env' });

// Cấu hình kết nối MySQL bằng Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Tên cơ sở dữ liệu
  process.env.DB_USER,       // Tên người dùng
  process.env.DB_PASSWORD,   // Mật khẩu
  {
    host: process.env.DB_HOST, // Máy chủ MySQL
    dialect: 'mysql',          // Loại cơ sở dữ liệu
    port: process.env.DB_PORT, // Cổng kết nối
  }
);


module.exports = sequelize;
