const UserModel = require("./user.model");
const ConversationModel = require("./conversation.model");
const ParticipantModel = require("./participant.model");
const MessageModel = require("./message.model");
const OtpModel = require("./otp.model");
const FriendModel = require("./friend.model");
const MessageStatusModel = require("./messageStatus.model");

ConversationModel.hasMany(MessageModel, {
  foreignKey: "conversationId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserModel.hasMany(MessageModel, {
  foreignKey: "senderId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserModel.hasOne(ConversationModel, {
  foreignKey: "creatorId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserModel.hasMany(ParticipantModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

ParticipantModel.belongsTo(UserModel, {
  foreignKey: "userId",
});

ConversationModel.hasMany(ParticipantModel, {
  foreignKey: "conversationId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

ParticipantModel.belongsTo(ConversationModel, {
  foreignKey: "conversationId",
});

UserModel.hasOne(OtpModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserModel.hasOne(FriendModel, {
  foreignKey: "userId1",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserModel.hasOne(FriendModel, {
  foreignKey: "userId2",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

MessageModel.hasOne(ParticipantModel, {
  foreignKey: "lastSeenMessageId",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});

ParticipantModel.hasMany(MessageStatusModel, {
  foreignKey: "participantId",
  onDelete: "SET NULL",
  onUpdate: "SET NULL",
});

MessageStatusModel.belongsTo(ParticipantModel, {
  foreignKey: "participantId",
});

MessageModel.hasMany(MessageStatusModel, {
  foreignKey: "messageId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

MessageStatusModel.belongsTo(MessageModel, {
  foreignKey: "messageId",
});

module.exports = {
  UserModel,
  ConversationModel,
  ParticipantModel,
  MessageModel,
  OtpModel,
};
