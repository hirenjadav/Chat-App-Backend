const { DataTypes } = require("sequelize");
const db = require("../config/database.config");

const Otp = db.define("otp", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  value: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  expireAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Otp;
