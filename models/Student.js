const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User=require("./User");
const Parent=require("./Parent");

const Student=sequelize.define("Student",{
    userId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{model:User,key:"id"}
    },
    dateOfBirth:{
        type: DataTypes.DATE, 
        allowNull: false
    },
    classroom:{
        type: DataTypes.STRING, 
        allowNull: false
    },
    parentId:{
        type: DataTypes.INTEGER,
        unique: true,
        references: { model: Parent, key: "userId" }
    }
});

User.hasOne(Student, { foreignKey: "userId", onDelete: "CASCADE" });
Student.belongsTo(User, { foreignKey: "userId" });

Parent.hasOne(Student,{foreignKey:"parentId"});
Student.belongsTo(Parent,{foreignKey:"parentId"});

sequelize.sync({ force: false })  // force: true sẽ xóa bảng cũ và tạo lại bảng mới
  .then(() => {
    console.log("Bảng Student đã được tạo thành công!");
  })
  .catch((err) => {
    console.error("Lỗi khi tạo bảng Student:", err);
  });

module.exports=Student;
