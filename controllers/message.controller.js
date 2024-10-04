const messageRespository = require("../repository/message.repo");
const errorHandler = require("../services/errorHandler.service");
const responseHandler = require("../services/responseHandler.service");

exports.fetchMessages = async (req, res, next) => {
  console.log("\n\n===> fetchMessages req.query", req.query);

  if (!req.query.userId || !req.query.conversationId)
    return errorHandler.throwBadRequestError(res);

  try {
    const filterOption = {
      senderId: req.query.userId,
      conversationId: req.query.conversationId,
    };

    if (req.query.messageId) {
      filterOption["id"] = req.query.messageId;
    }

    const messageList = await messageRespository.fetchMessages(filterOption);

    responseHandler.sendSuccessResponse(messageList);
  } catch (error) {
    console.log(error);
    errorHandler.throwServerError(res);
  }
};

exports.createMessage = async (req, res, next) => {
  console.log("\n\n===> createMessage req.body", req.body);

  if (!req.body.messageType) return errorHandler.throwBadRequestError(res);

  try {
    const messageData = {};
    messageData["messageType"] = req.body?.messageType;
    messageData["message"] = req.body?.message;
    messageData["messageAttachment"] = req.body?.messageAttachment;
    messageData["messageAttachmentType"] = req.body?.messageAttachmentType;

    const newMessage = await messageRespository.createMessage(messageData);

    responseHandler.sendSuccessResponse(res, newMessage);
  } catch (error) {
    console.log(error);
    errorHandler.throwServerError(res);
  }
};

exports.updateMessage = async (req, res, next) => {
  console.log("\n\n===> updateMessage req.body", req.body);

  if (!req.body.messageId) return errorHandler.throwBadRequestError(res);

  try {
    const updateMessage = await messageRespository.updateMessage(
      req.body.messageId,
      req.body
    );
    responseHandler.sendSuccessResponse(res, updateMessage);
  } catch (error) {
    console.log(error);
    errorHandler.throwServerError();
  }
};

exports.deleteMessage = async (req, res, next) => {
  console.log("\n\n===> deleteMessage req.query", req.query);

  if (!req.query.messageId) return errorHandler.throwBadRequestError(res);

  try {
    const data = await messageRespository.deleteMessage(req.query.messageId);
    responseHandler.sendSuccessResponse(res, data);
  } catch (error) {
    console.log(error);
    errorHandler.throwServerError(res);
  }
};
