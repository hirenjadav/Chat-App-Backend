const errorHandler = require("../services/errorHandler.service");
const responseHandler = require("../services/responseHandler.service");
const conversationRespository = require("../repository/conversation.repo");
const APIError = require("../utils/ApiError");
const HTTP400Error = require("../utils/Http400Error");
const logger = require("../services/logger.service");

exports.fetchConversations = async (req, res, next) => {
  logger.log("fetchConversations req.query", req.query);

  if (!req.query.userId) throw new HTTP400Error();

  try {
    const filterOption = {
      creatorId: req.query.userId,
    };

    if (req.query.conversationId) {
      filterOption["id"] = req.query.conversationId;
    }

    const conversationList = await conversationRespository.fetchConversations(
      filterOption
    );

    responseHandler.sendSuccessResponse(res, conversationList);
  } catch (error) {
    next(error);
  }
};

exports.fetchConversationList = async (req, res, next) => {
  logger.log("fetchConversationList req.query", req.query);

  if (!req.query.userId) throw new HTTP400Error();

  try {
    const filterOption = {};
    if (req.query.conversationId) filterOption["id"] = req.query.conversationId;
    if (req.query.conversationType)
      filterOption["type"] = req.query.conversationType;

    const conversationList =
      await conversationRespository.fetchConversationList(
        req.query.userId,
        filterOption
      );

    responseHandler.sendSuccessResponse(res, conversationList);
  } catch (error) {
    next(error);
  }
};

exports.createConversation = async (req, res, next) => {
  logger.log("createConversation req.body", req.body);

  if (
    !req.query.userId ||
    !req.body.conversationType ||
    !req.body.participantIds
  )
    throw new HTTP400Error();

  try {
    const newConversation = await conversationRespository.createConversation(
      req.query.userId,
      req.body.conversationType,
      req.body.participantIds,
      req.body?.name
    );

    responseHandler.sendSuccessResponse(res, newConversation);
  } catch (error) {
    next(error);
  }
};

exports.deleteConversation = async (req, res, next) => {
  logger.log("deleteConversation req.query", req.query);

  if (!req.query.userId || !req.query.conversationId) throw new HTTP400Error();

  try {
    const data = await conversationRespository.deleteConversation(
      req.query.userId,
      req.query.conversationId
    );
    responseHandler.sendSuccessResponse(res, data);
  } catch (error) {
    next(error);
  }
};
