const UserModel = require("./user.model");
const ConversationModel = require("./conversation.model");
const ParticipantModel = require("./participant.model");
const MessageModel = require("./message.model");
const MessageStatusModel = require("./messageStatus.model");

ConversationModel.hasMany(MessageModel, {
  foreignKey: "conversationId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
MessageModel.belongsTo(ConversationModel, { foreignKey: "conversationId" });

UserModel.hasMany(MessageModel, {
  foreignKey: "senderId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
MessageModel.belongsTo(UserModel, { foreignKey: "senderId" });

UserModel.hasMany(ConversationModel, {
  foreignKey: "creatorId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
ConversationModel.belongsTo(UserModel, { foreignKey: "creatorId" });

UserModel.belongsToMany(ConversationModel, {
  through: ParticipantModel,
});
ConversationModel.belongsToMany(UserModel, {
  through: ParticipantModel,
});

MessageModel.hasMany(MessageStatusModel, {
  foreignKey: "messageId",
});
MessageStatusModel.belongsTo(MessageModel, {
  foreignKey: "messageId",
});

ParticipantModel.hasMany(MessageStatusModel, {
  foreignKey: "participantId",
});
MessageStatusModel.belongsTo(ParticipantModel, {
  foreignKey: "participantId",
});

module.exports = {
  UserModel,
  ConversationModel,
  ParticipantModel,
  MessageModel,
};
