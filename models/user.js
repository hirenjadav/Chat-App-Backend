const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneCountryCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = User;
