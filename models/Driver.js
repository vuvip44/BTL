const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User=require("./User");

const Driver = sequelize.define("Driver", {
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

User.hasOne(Driver, { foreignKey: "userId", onDelete: "CASCADE" });
Driver.belongsTo(User, { foreignKey: "userId" });

sequelize.sync({ force: false })  // force: true sẽ xóa bảng cũ và tạo lại bảng mới
  .then(() => {
    console.log("Bảng Driver đã được tạo thành công!");
  })
  .catch((err) => {
    console.error("Lỗi khi tạo bảng Driver:", err);
  });

module.exports = Driver;