const Message = require("../models/message.model");

exports.fetchMessages = async (req, res, next) => {
  console.log("\n\n===> fetchMessages req.query", req.query);

  if (!req.query.userId || !req.query.conversationId) res.send({});
  const filterOption = {
    senderId: req.query.userId,
    conversationId: req.query.conversationId,
  };

  if (req.query.messageId) {
    filterOption["id"] = req.query.messageId;
  }

  const messageList = await Message.findAll({
    where: filterOption,
  });

  res.status(200).json(messageList);
};

exports.createMessage = async (req, res, next) => {
  console.log("\n\n===> createMessage req.body", req.body);

  if (!req.body.messageType) res.send({});

  const messageData = { messageType: req.body.messageType };
  if (req.body.message) messageData["message"] = req.body.message;
  if (req.body.messageAttachment)
    messageData["messageAttachment"] = req.body.messageAttachment;
  if (req.body.messageAttachmentType)
    messageData["messageAttachmentType"] = req.body.messageAttachmentType;

  const newMessage = Participant.build(messageData);
  await newMessage.save();

  res.status(200).send(newParticipant);
};

exports.updateMessage = async (req, res, next) => {
  console.log("\n\n===> updateMessage req.body", req.body);

  if (!req.body.messageId) res.send({});

  const message = Message.findOne({
    where: {
      id: req.body.messageId,
    },
  });

  if (req.body.message) message["message"] = req.body.message;

  if (req.body.messageAttachment)
    message["messageAttachment"] = req.body.messageAttachment;

  if (req.body.messageAttachmentType)
    message["messageAttachmentType"] = req.body.messageAttachmentType;

  if (req.body.isMessageSent) message["isMessageSent"] = req.body.isMessageSent;

  if (req.body.isMessageViewed)
    message["isMessageViewed"] = req.body.isMessageViewed;

  if (req.body.deletedAt) message["deletedAt"] = req.body.deletedAt;

  await message.save();

  res.status(200).send(message);
};

exports.deleteMessage = async (req, res, next) => {
  console.log("\n\n===> deleteMessage req.query", req.query);

  req.query.deletedAt = new Date();
  this.updateMessage(req, res, next);

  res.status(200).send(req.query.messageId);
};
