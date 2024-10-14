const ERROR_CODES = require("../constants/errorCodes.constant");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");
const Message = require("../models/message.model");
const BaseError = require("../utils/BaseError");

const fetchMessages = async (filterOption) => {
  try {
    const messageList = await Message.findAll({
      where: filterOption,
      order: [["updatedAt", "ASC"]],
    });
    return messageList; // Return the fetched messages
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const fetchLatestMessage = async (conversationId) => {
  try {
    const message = await Message.findOne({
      where: { conversationId },
      order: [["createdAt", "DESC"]],
      limit: 1,
    });
    return message; // Return the fetched messages
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const createMessage = async (data) => {
  try {
    const messageData = {
      senderId: data.senderId,
      messageType: data.messageType,
      conversationId: data.conversationId,
    };

    if (data.message) messageData["message"] = data.message;
    if (data.messageAttachment)
      messageData["messageAttachment"] = data.messageAttachment;
    if (data.messageAttachmentType)
      messageData["messageAttachmentType"] = data.messageAttachmentType;

    const newMessage = Message.build(messageData);
    await newMessage.save();

    return newMessage; // Return the newly created message
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const updateMessage = async (messageId, data) => {
  try {
    const message = await Message.findOne({
      where: { id: messageId },
    });

    if (!message)
      throw new BaseError(HTTP_STATUS_CODE.OK, ERROR_CODES.MESSAGE_NOT_FOUND);

    // Update fields if provided
    if (data.message) message.message = data.message;
    if (data.messageAttachment)
      message.messageAttachment = data.messageAttachment;
    if (data.messageAttachmentType)
      message.messageAttachmentType = data.messageAttachmentType;
    if (data.isMessageSent) message.isMessageSent = data.isMessageSent;
    if (data.isMessageViewed) message.isMessageViewed = data.isMessageViewed;
    if (data.deletedAt) message.deletedAt = data.deletedAt;

    // Save the updated message
    await message.save();

    return message; // Return the updated message
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const deleteMessage = async (messageId) => {
  try {
    const data = { deletedAt: new Date() };
    await updateMessage(messageId, data); // Assuming updateMessage is a defined function

    return messageId; // Return messageId to indicate successful "soft delete"
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const messageRespository = {
  fetchMessages,
  fetchLatestMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};

module.exports = messageRespository;
