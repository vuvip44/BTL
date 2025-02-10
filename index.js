// const express = require('express');
// const cookieParser = require('cookie-parser');
// const dotenv = require('dotenv');
// const sequelize = require('./config/db'); // Import sequelize
// const userRouter = require('./router/UserRouter'); // Import UserRouter
// const roleRouter = require('./router/RoleRouter'); // Import RoleRouter
// const contextMiddleware = require('./middleware/ContextMiddleware');
// // Load biến môi trường từ file .env
// dotenv.config({ path: './.env' });

// // Khởi tạo ứng dụng Express
// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware để parse JSON
// app.use(express.json());
// app.use(contextMiddleware);
// app.use(cookieParser());

// // Kết nối cơ sở dữ liệu MySQL qua Sequelize
// // (async () => {
// //   try {
// //     await sequelize.authenticate();
// //     console.log('Kết nối MySQL thành công!');

// //     // Đồng bộ hóa model với cơ sở dữ liệu
// //     await sequelize.sync({ alter: true }); // Chỉ cập nhật cấu trúc bảng nếu thay đổi
// //     console.log('Đồng bộ hóa model với cơ sở dữ liệu thành công!');
// //     require('./seeders/Seed');
// //   } catch (error) {
// //     console.error('Lỗi kết nối hoặc đồng bộ cơ sở dữ liệu:', error);
// //   }
// // })();

// // // Định nghĩa route cho API User
// // app.use('/api/user', userRouter);
// // app.use('/api/role', roleRouter);

// // Kết nối MySQL
// sequelize.authenticate()
//   .then(() => {
//     console.log("Kết nối MySQL thành công!");
//     return sequelize.sync({ alter: true }); // Đồng bộ DB
//   })
//   .then(() => {
//     console.log("Database đã được đồng bộ!");
//   })
//   .catch(err => console.error("Lỗi kết nối MySQL:", err));

// // Lắng nghe trên cổng được chỉ định
// app.listen(port, () => {
//   console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
// });



require("dotenv").config(); // Load biến môi trường từ .env
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db"); // Import Sequelize từ models/index.js
const User = require("./models/User");
const Role = require("./models/Role");
const Student = require("./models/Student");
const Parent = require("./models/Parent");
const Teacher = require("./models/Teacher");
const studentRoutes=require("./router/StudentRouter");
const parentRoutes=require("./router/ParentRouter");


const app = express();

// Middleware
app.use(bodyParser.json()); // Xử lý JSON request body
app.use("/api/students",studentRoutes);
app.use("/api/parents",parentRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log("Database synced!");
}).catch(err => console.error("Sync error:", err));
// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
