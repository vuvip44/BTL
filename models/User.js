const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./Role');

// Định nghĩa model User
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  access_token: {
    type: DataTypes.TEXT
  },
  roleId:{
    type: DataTypes.INTEGER,
    references:{
      model: Role,
      key: 'id'
    }
  }
});

// Thiết lập quan hệ 1-n
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

// Tạo bảng trong cơ sở dữ liệu nếu chưa tồn tại
sequelize.sync({ force: false })  // force: true sẽ xóa bảng cũ và tạo lại bảng mới
  .then(() => {
    console.log("Bảng User đã được tạo thành công!");
  })
  .catch((err) => {
    console.error("Lỗi khi tạo bảng User:", err);
  });

module.exports = User;
