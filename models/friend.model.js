const { DataTypes } = require("sequelize");
const db = require("../config/database.config");

const Friend = db.define("friend", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  userNickName1: {
    type: DataTypes.STRING,
  },
  userNickName2: {
    type: DataTypes.STRING,
  },
});

module.exports = Friend;
