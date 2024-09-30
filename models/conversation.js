const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Conversation = sequelize.define("conversation", {
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
