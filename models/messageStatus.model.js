const { DataTypes } = require("sequelize");
const db = require("../config/database.config");
const MESSAGE_STATUS_TYPES = require("../constants/messageStatusType.constant");

const MessageStatus = db.define("messageStatus", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: MESSAGE_STATUS_TYPES.PENDING,
  },
});

module.exports = MessageStatus;
