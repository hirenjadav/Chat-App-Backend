const errorHandler = require("../services/errorHandler.service");
const responseHandler = require("../services/responseHandler.service");
const conversationRespository = require("../repository/conversation.repo");

exports.fetchConversations = async (req, res, next) => {
  console.log("\n\n===> fetchConversations req.query", req.query);

  if (!req.query.userId) return errorHandler.throwBadRequestError(res);

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
    console.log(error);
    errorHandler.throwServerError(res);
  }
};

exports.createConversation = async (req, res, next) => {
  console.log("\n\n===> createConversation req.body", req.body);

  if (
    !req.body.userId ||
    !req.body.conversationType ||
    !req.body.participantIds
  )
    return errorHandler.throwBadRequestError(res);

  try {
    const newConversation = await conversationRespository.createConversation(
      req.body.userId,
      req.body.conversationType,
      req.body.participantIds
    );

    responseHandler.sendSuccessResponse(res, newConversation);
  } catch (error) {
    console.log(error);
    errorHandler.throwServerError(res);
  }
};

exports.deleteConversation = async (req, res, next) => {
  console.log("\n\n===> deleteConversation req.query", req.query);

  if (!req.query.userId || !req.query.conversationId)
    return errorHandler.throwBadRequestError(res);

  try {
    const data = await conversationRespository.deleteConversation(
      req.query.userId,
      req.query.conversationId
    );
    responseHandler.sendSuccessResponse(res, data);
  } catch (error) {
    console.log(error);
    errorHandler.throwServerError(res);
  }
};
