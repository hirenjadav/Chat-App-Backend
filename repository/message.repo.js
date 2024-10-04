const Message = require("../models/message.model");

const fetchMessages = async (filterOption) => {
  return new Promise(async (resolve) => {
    const messageList = await Message.findAll({ where: filterOption });
    resolve(messageList);
  });
};

const createMessage = async (data) => {
  return new Promise(async (resolve) => {
    const messageData = { messageType: data.messageType };
    if (data.message) messageData["message"] = data.message;
    if (data.messageAttachment)
      messageData["messageAttachment"] = data.messageAttachment;
    if (data.messageAttachmentType)
      messageData["messageAttachmentType"] = data.messageAttachmentType;

    const newMessage = Message.build(messageData);
    await newMessage.save();
    resolve(newMessage);
  });
};

const updateMessage = async (messageId, data) => {
  return new Promise(async (resolve) => {
    const message = Message.findOne({
      where: {
        id: messageId,
      },
    });

    if (data.message) message["message"] = data.message;

    if (data.messageAttachment)
      message["messageAttachment"] = data.messageAttachment;

    if (data.messageAttachmentType)
      message["messageAttachmentType"] = data.messageAttachmentType;

    if (data.isMessageSent) message["isMessageSent"] = data.isMessageSent;

    if (data.isMessageViewed) message["isMessageViewed"] = data.isMessageViewed;

    if (data.deletedAt) message["deletedAt"] = data.deletedAt;

    await message.save();

    resolve(message);
  });
};

const deleteMessage = async (messageId) => {
  const data = {};
  data["deletedAt"] = new Date();
  await this.updateMessage(messageId, data);
  resolve(messageId);
};

const messageRespository = {
  fetchMessages,
  createMessage,
  updateMessage,
  deleteMessage,
};

module.exports = messageRespository;
