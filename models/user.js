const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize();

const User = sequelize.define("user", {
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_country_code: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});

module.exports = User;
