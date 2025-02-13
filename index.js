
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
const teacherRoutes=require("./router/TeacherRouter");
const driverRoutes=require("./router/DriverRouter");


const app = express();

// Middleware
app.use(bodyParser.json()); // Xử lý JSON request body
app.use("/api/students",studentRoutes);
app.use("/api/parents",parentRoutes);
app.use("/api/teachers",teacherRoutes);
app.use("/api/drivers",driverRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log("Database synced!");
}).catch(err => console.error("Sync error:", err));
// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
