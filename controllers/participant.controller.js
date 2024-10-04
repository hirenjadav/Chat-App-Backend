const errorHandler = require("../services/errorHandler.service");
const responseHandler = require("../services/responseHandler.service");
const participantRepository = require("../repository/participant.repo");

exports.fetchParticipants = async (req, res, next) => {
  console.log("\n\n===> fetchParticipants req.query", req.query);

  if (!req.query.conversationId) return errorHandler.throwBadRequestError(res);

  const participantList = await participantRepository.fetchParticipants(
    req.query.conversationId
  );

  responseHandler.sendSuccessResponse(res, participantList);
};

exports.createParticipant = async (req, res, next) => {
  console.log("\n\n===> createParticipant req.body", req.body);

  if (!req.body.userId || !req.body.userType || !req.body.conversationId)
    return errorHandler.throwBadRequestError(res);

  try {
    const newParticipant = await participantRepository.createParticipant(
      userId,
      conversationId,
      userType
    );
    responseHandler.sendSuccessResponse(res, newParticipant);
  } catch (error) {
    console.log(error);
    errorHandler.throwServerError(res);
  }
};

exports.createBulkParticipants = async (req, res, next) => {
  console.log("\n\n===> createBulkParticipants req.body", req.body);

  if (!req.body.conversationId || !req.body.participantIds)
    return errorHandler.throwBadRequestError(res);

  try {
    const newParticipants = await participantRepository.createBulkParticipants(
      req.body.conversationId,
      req.body.participantIds
    );

    responseHandler.sendSuccessResponse(res, newParticipants);
  } catch (error) {
    console.log(error);
    errorHandler.throwServerError(res);
  }
};

exports.updateParticipant = async (req, res, next) => {
  console.log("\n\n===> updateParticipant req.body", req.body);

  if (!req.body.userType || !req.body.participantId)
    return errorHandler.throwBadRequestError(res);

  try {
    const participant = await participantRepository.updateParticipant(
      req.body.participantId,
      req.body.userType
    );
    responseHandler.sendSuccessResponse(res, participant);
  } catch (error) {
    console.log(error);
    errorHandler.throwServerError(res);
  }
};

exports.deleteParticipant = async (req, res, next) => {
  console.log("\n\n===> deleteParticipant req.query", req.query);

  if (!req.query.participantId) return errorHandler.throwBadRequestError(res);

  try {
    const data = await participantRepository.deleteParticipant(
      req.query.participantId
    );
    responseHandler.sendSuccessResponse(res, data);
  } catch (error) {
    console.log(error);
    errorHandler.throwServerError(res);
  }
};
