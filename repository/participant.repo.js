const ERROR_CODES = require("../constants/errorCodes.constant");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");
const Participant = require("../models/participant.model");
const BaseError = require("../utils/BaseError");
const userRepository = require("./user.repo");

const fetchParticipants = async (filterOptions = {}) => {
  try {
    const participantList = await Participant.findAll({
      where: filterOptions,
    });

    const mappedParticipantList = await Promise.all(
      participantList.map(async (participant) => mapParticipant(participant))
    );

    return mappedParticipantList; // Return the list of participants
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const fetchParticipantsByConversationId = async (conversationId) => {
  try {
    const participantList = await Participant.findAll({
      where: { conversationId },
    });

    const mappedParticipantList = await Promise.all(
      participantList.map(async (participant) => mapParticipant(participant))
    );

    return mappedParticipantList; // Return the list of participants
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const createParticipant = async (userId, userType, conversationId) => {
  try {
    const newParticipant = await Participant.create({
      userId,
      userType,
      conversationId,
    });

    return newParticipant; // Return the newly created participant
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const createBulkParticipants = async (conversationId, participantIds) => {
  try {
    const participantList = participantIds.map((userId) => ({
      userId,
      userType: "userType", // You might want to replace "userType" with the actual user type
      conversationId,
    }));

    // Use bulkCreate instead of bulkBuild and save
    const newParticipants = await Participant.bulkCreate(participantList);

    return newParticipants; // Return the newly created participants
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const updateParticipant = async (participantId, userType) => {
  try {
    const participant = await Participant.findOne({
      where: { id: participantId },
    });

    if (!participant) {
      throw new BaseError(
        HTTP_STATUS_CODE.OK,
        ERROR_CODES.PARTICIPANT_NOT_FOUND
      );
    }

    participant.userType = userType; // Update user type
    await participant.save();

    return participant; // Return the updated participant
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const deleteParticipant = async (participantId) => {
  try {
    const result = await Participant.destroy({
      where: { id: participantId },
    });

    return participantId; // Return the participant ID for confirmation
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const mapParticipant = async (p) => {
  const participantDetails = await userRepository.fetchUsers({
    id: p.userId,
  });
  return {
    id: p.id,
    participantType: p.userType,
    userId: participantDetails[0].id,
    fullName: participantDetails[0].fullName,
    firstName: participantDetails[0].firstName,
    lastName: participantDetails[0].lastName,
    email: participantDetails[0].email,
    phoneNumber: participantDetails[0].phoneNumber,
    profilePicture: participantDetails[0].profilePicture,
    lastSeenMessageId: p.lastSeenMessageId,
    unseenMessageCount: p.unseenMessageCount,
  };
};

const participantRespository = {
  fetchParticipants,
  fetchParticipantsByConversationId,
  createParticipant,
  createBulkParticipants,
  updateParticipant,
  deleteParticipant,
};

module.exports = participantRespository;
