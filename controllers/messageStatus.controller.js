const ERROR_CODES = require("../constants/errorCodes.constant");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");
const messageStatusRespository = require("../repository/messageStatus.repo");
const participantRespository = require("../repository/participant.repo");
const errorHandler = require("../services/errorHandler.service");
const logger = require("../services/logger.service");
const responseHandler = require("../services/responseHandler.service");
const HTTP400Error = require("../utils/Http400Error");

exports.updateMultipleSingleUserMessageStatus = async (data) => {
  if (
    !data.senderId ||
    !data.status ||
    !data.conversationId ||
    !data.messageIds ||
    !data.messageIds.length
  )
    throw new HTTP400Error();

  try {
    const participantFilter = {
      userId: data.senderId,
      conversationId: data.conversationId,
    };

    const participants = await participantRespository.fetchParticipants(
      participantFilter
    );

    if (!participants.length)
      throw new BaseError(
        HTTP_STATUS_CODE.OK,
        ERROR_CODES.PARTICIPANT_NOT_FOUND
      );

    await Promise.all(
      data.messageIds.map(async (x) => {
        await messageStatusRespository.updateMessageStatus(
          x,
          participants[0].id,
          data.status
        );
      })
    );

    return true;
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};
