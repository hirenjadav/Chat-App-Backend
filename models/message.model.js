const { DataTypes } = require("sequelize");
const db = require("../config/database.config");
const MESSAGE_TYPES = require("../constants/messageStatusType.constant");

const Message = db.define("message", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  messageType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: DataTypes.STRING,
  messageAttachment: DataTypes.STRING,
  messageAttachmentType: DataTypes.STRING,
  deletedAt: DataTypes.DATE,
});

module.exports = Message;
