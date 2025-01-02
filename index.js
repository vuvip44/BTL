const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/db'); // Import sequelize
const userRouter = require('./router/UserRouter'); // Import UserRouter
const roleRouter = require('./router/RoleRouter'); // Import RoleRouter

// Load biến môi trường từ file .env
dotenv.config({ path: './.env' });

// Khởi tạo ứng dụng Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware để parse JSON
app.use(express.json());
app.use(cookieParser());

// Kết nối cơ sở dữ liệu MySQL qua Sequelize
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Kết nối MySQL thành công!');

    // Đồng bộ hóa model với cơ sở dữ liệu
    await sequelize.sync({ alter: true }); // Chỉ cập nhật cấu trúc bảng nếu thay đổi
    console.log('Đồng bộ hóa model với cơ sở dữ liệu thành công!');
    require('./seeders/Seed');
  } catch (error) {
    console.error('Lỗi kết nối hoặc đồng bộ cơ sở dữ liệu:', error);
  }
})();

// Định nghĩa route cho API User
app.use('/api/user', userRouter);
app.use('/api/role', roleRouter);

// Lắng nghe trên cổng được chỉ định
app.listen(port, () => {
  console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});
