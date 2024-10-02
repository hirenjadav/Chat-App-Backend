const { DataTypes } = require("sequelize");
const db = require("../config/database.config");

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
  isMessageSent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isMessageViewed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  message: DataTypes.STRING,
  messageAttachment: DataTypes.STRING,
  messageAttachmentType: DataTypes.STRING,
  deletedAt: DataTypes.DATE,
});

module.exports = Message;
