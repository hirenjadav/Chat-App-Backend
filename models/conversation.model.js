const { DataTypes } = require("sequelize");
const db = require("../config/database.config");

const Conversation = db.define("conversation", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Conversation;
