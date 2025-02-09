const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User=require("./User");

const Teacher = sequelize.define("Teacher", {
    userId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{model:User,key:"id"}
    },
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:false
    }

});

User.hasOne(Teacher, { foreignKey: "userId", onDelete: "CASCADE" });
Teacher.belongsTo(User, { foreignKey: "userId" });

sequelize.sync({ force: false })  // force: true sẽ xóa bảng cũ và tạo lại bảng mới
  .then(() => {
    console.log("Bảng Teacher đã được tạo thành công!");
  })
  .catch((err) => {
    console.error("Lỗi khi tạo bảng Teacher:", err);
  });

module.exports = Teacher;