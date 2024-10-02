const { DataTypes } = require("sequelize");
const db = require("../config/database.config");

const Participant = db.define("participant", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Participant;
