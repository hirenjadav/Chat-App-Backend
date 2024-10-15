const messageRespository = require("../repository/message.repo");
const errorHandler = require("../services/errorHandler.service");
const logger = require("../services/logger.service");
const responseHandler = require("../services/responseHandler.service");
const HTTP400Error = require("../utils/Http400Error");

exports.fetchMessages = async (req, res, next) => {
  logger.log("fetchMessages req.query", req.query);

  if (!req.query.conversationId) throw new HTTP400Error();

  try {
    const filterOption = {
      conversationId: req.query.conversationId,
    };

    if (req.query.messageId) {
      filterOption["id"] = req.query.messageId;
    }

    const messageList = await messageRespository.fetchMessages(filterOption);

    responseHandler.sendSuccessResponse(res, messageList);
  } catch (error) {
    next(error);
  }
};

exports.createMessage = async (req, res, next) => {
  logger.log("createMessage req.body", req.body);

  if (!req.body.conversationId || !req.body.messageType)
    throw new HTTP400Error();

  try {
    const messageData = {};
    messageData["senderId"] = req.query.userId;
    messageData["conversationId"] = req.body?.conversationId;
    messageData["messageType"] = req.body?.messageType;
    messageData["message"] = req.body?.message;
    messageData["messageAttachment"] = req.body?.messageAttachment;
    messageData["messageAttachmentType"] = req.body?.messageAttachmentType;

    const newMessage = await messageRespository.createMessage(messageData);

    responseHandler.sendSuccessResponse(res, newMessage);
  } catch (error) {
    next(error);
  }
};

exports.updateMessage = async (req, res, next) => {
  logger.log("updateMessage req.body", req.body);

  if (!req.body.messageId) throw new HTTP400Error();

  try {
    const updateMessage = await messageRespository.updateMessage(
      req.body.messageId,
      req.body
    );
    responseHandler.sendSuccessResponse(res, updateMessage);
  } catch (error) {
    logger.log(error);
    errorHandler.throwServerError();
  }
};

exports.deleteMessage = async (req, res, next) => {
  logger.log("deleteMessage req.query", req.query);

  if (!req.query.messageId) throw new HTTP400Error();

  try {
    const data = await messageRespository.deleteMessage(req.query.messageId);
    responseHandler.sendSuccessResponse(res, data);
  } catch (error) {
    next(error);
  }
};
