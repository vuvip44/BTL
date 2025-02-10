const sequelize = require("../config/db");
const Role = require("../models/Role");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function seedData() {
  try {
    await sequelize.sync({ force: false }); // Đảm bảo DB được sync

    // 🔹 Kiểm tra và tạo Roles
    const roles = ["ADMIN", "USER","TEACHER","STUDENT","PARENT"];
    for (const roleName of roles) {
      const roleExists = await Role.findOne({ where: { name: roleName } });
      if (!roleExists) {
        await Role.create({ name: roleName });
        console.log(`Role ${roleName} đã được tạo.`);
      }
    }

    // 🔹 Lấy ID của role ADMIN
    const adminRole = await Role.findOne({ where: { name: "ADMIN" } });

    // 🔹 Kiểm tra & tạo User admin
    const existingAdmin = await User.findOne({ where: { email: "admin@gmail.com" } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("123", 10);
      await User.create({
        fullName: "Admin",
        email: "admin@gmail.com",
        username:"admin",
        password: hashedPassword,
        roleId: adminRole.id,
      });
      console.log("User admin đã được tạo.");
    } else {
      console.log("User admin đã tồn tại.");
    }

    console.log("Seed dữ liệu hoàn tất!");
    process.exit(); // Kết thúc chương trình sau khi seed xong
  } catch (error) {
    console.error("Lỗi khi seed dữ liệu:", error);
    process.exit(1); // Thoát chương trình với mã lỗi
  }
}

// Gọi hàm seed
seedData();
