const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Message = sequelize.define("message", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  conversationId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  messageType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: DataTypes.STRING,
  messageAttachment: DataTypes.STRING,
  messageAttachmentType: DataTypes.STRING,
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
});

module.exports = Message;
