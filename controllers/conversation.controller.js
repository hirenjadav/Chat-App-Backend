const errorHandler = require("../services/errorHandler.service");
const responseHandler = require("../services/responseHandler.service");
const conversationRespository = require("../repository/conversation.repo");
const APIError = require("../utils/ApiError");
const HTTP400Error = require("../utils/Http400Error");

exports.fetchConversations = async (req, res, next) => {
  console.log("\n\n===> fetchConversations req.query", req.query);

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
  console.log("\n\n===> fetchConversationList req.query", req.query);

  if (!req.query.userId) throw new HTTP400Error();

  try {
    const conversationList =
      await conversationRespository.fetchConversationList(req.query.userId);

    responseHandler.sendSuccessResponse(res, conversationList);
  } catch (error) {
    next(error);
  }
};

exports.createConversation = async (req, res, next) => {
  console.log("\n\n===> createConversation req.body", req.body);

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
      req.body.participantIds
    );

    responseHandler.sendSuccessResponse(res, newConversation);
  } catch (error) {
    next(error);
  }
};

exports.deleteConversation = async (req, res, next) => {
  console.log("\n\n===> deleteConversation req.query", req.query);

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
