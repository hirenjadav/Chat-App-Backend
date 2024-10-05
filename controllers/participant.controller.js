const errorHandler = require("../services/errorHandler.service");
const responseHandler = require("../services/responseHandler.service");
const participantRepository = require("../repository/participant.repo");
const APIError = require("../utils/ApiError");
const HTTP400Error = require("../utils/Http400Error");

exports.fetchParticipants = async (req, res, next) => {
  console.log("\n\n===> fetchParticipants req.query", req.query);

  if (!req.query.conversationId) throw new HTTP400Error();

  const participantList = await participantRepository.fetchParticipants(
    req.query.conversationId
  );

  responseHandler.sendSuccessResponse(res, participantList);
};

exports.createParticipant = async (req, res, next) => {
  console.log("\n\n===> createParticipant req.body", req.body);

  if (!req.body.userId || !req.body.userType || !req.body.conversationId)
    throw new HTTP400Error();

  try {
    const newParticipant = await participantRepository.createParticipant(
      userId,
      conversationId,
      userType
    );
    responseHandler.sendSuccessResponse(res, newParticipant);
  } catch (error) {
    throw new APIError();
  }
};

exports.createBulkParticipants = async (req, res, next) => {
  console.log("\n\n===> createBulkParticipants req.body", req.body);

  if (!req.body.conversationId || !req.body.participantIds)
    throw new HTTP400Error();

  try {
    const newParticipants = await participantRepository.createBulkParticipants(
      req.body.conversationId,
      req.body.participantIds
    );

    responseHandler.sendSuccessResponse(res, newParticipants);
  } catch (error) {
    throw new APIError();
  }
};

exports.updateParticipant = async (req, res, next) => {
  console.log("\n\n===> updateParticipant req.body", req.body);

  if (!req.body.userType || !req.body.participantId) throw new HTTP400Error();

  try {
    const participant = await participantRepository.updateParticipant(
      req.body.participantId,
      req.body.userType
    );
    responseHandler.sendSuccessResponse(res, participant);
  } catch (error) {
    throw new APIError();
  }
};

exports.deleteParticipant = async (req, res, next) => {
  console.log("\n\n===> deleteParticipant req.query", req.query);

  if (!req.query.participantId) throw new HTTP400Error();

  try {
    const data = await participantRepository.deleteParticipant(
      req.query.participantId
    );
    responseHandler.sendSuccessResponse(res, data);
  } catch (error) {
    throw new APIError();
  }
};
