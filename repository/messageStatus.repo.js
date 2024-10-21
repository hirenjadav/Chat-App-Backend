const ERROR_CODES = require("../constants/errorCodes.constant");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");
const MESSAGE_STATUS_TYPES = require("../constants/messageStatusType.constant");
const MessageStatus = require("../models/messageStatus.model");
const BaseError = require("../utils/BaseError");
const participantRespository = require("./participant.repo");

const fetchMessageStatus = async (filterOption) => {
  try {
    const messageStatusList = await MessageStatus.findAll({
      where: filterOption,
    });
    return messageStatusList; // Return the fetched messages
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const createMessageStatus = async (messageId, conversationId) => {
  try {
    const participantList =
      await participantRespository.fetchParticipantsByConversationId(
        conversationId
      );

    const list = participantList.map((x) => {
      return {
        status: MESSAGE_STATUS_TYPES.PENDING,
        participantId: x.id,
        messageId,
      };
    });

    const messageStatusList = await MessageStatus.bulkCreate(list);

    return messageStatusList;
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const updateMessageStatus = async (messageId, participantId, status) => {
  try {
    const message = await MessageStatus.findOne({
      where: { messageId, participantId },
    });

    if (!message)
      throw new BaseError(HTTP_STATUS_CODE.OK, ERROR_CODES.MESSAGE_NOT_FOUND);

    message.status = status;

    // Save the updated message
    await message.save();

    return message; // Return the updated message
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const messageStatusRespository = {
  fetchMessageStatus,
  createMessageStatus,
  updateMessageStatus,
};

module.exports = messageStatusRespository;
