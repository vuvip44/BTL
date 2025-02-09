const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User=require("./User");

const Parent = sequelize.define("Parent", {
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

User.hasOne(Parent, { foreignKey: "userId", onDelete: "CASCADE" });
Parent.belongsTo(User, { foreignKey: "userId" });

sequelize.sync({ force: false })  // force: true sẽ xóa bảng cũ và tạo lại bảng mới
  .then(() => {
    console.log("Bảng Parent đã được tạo thành công!");
  })
  .catch((err) => {
    console.error("Lỗi khi tạo bảng Parent:", err);
  });

module.exports = Parent;