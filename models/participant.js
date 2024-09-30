const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Participant = sequelize.define("participant", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  conversationId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  joinedTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Participant;
