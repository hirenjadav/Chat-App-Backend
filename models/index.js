const UserModel = require("./user.model");
const ConversationModel = require("./conversation.model");
const ParticipantModel = require("./participant.model");
const MessageModel = require("./message.model");
const OtpModel = require("./otp.model");
const FriendModel = require("./friend.model");

ConversationModel.hasOne(MessageModel, {
  foreignKey: "conversationId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserModel.hasOne(ConversationModel, {
  foreignKey: "creatorId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserModel.hasOne(MessageModel, {
  foreignKey: "senderId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserModel.hasOne(ParticipantModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

ConversationModel.hasOne(ParticipantModel, {
  foreignKey: "conversationId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
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
  foreignKey: "userId1",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserModel.hasOne(FriendModel, {
  foreignKey: "userId2",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

UserModel.hasOne(FriendModel, {
  foreignKey: "userId2",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = {
  UserModel,
  ConversationModel,
  ParticipantModel,
  MessageModel,
  OtpModel,
};
