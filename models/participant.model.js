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
});

module.exports = Participant;
