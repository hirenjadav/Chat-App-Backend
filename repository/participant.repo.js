const Participant = require("../models/participant.model");

const fetchParticipants = async (conversationId) => {
  return new Promise(async (resolve) => {
    const participantList = await Participant.findAll({
      where: { conversationId },
    });
    resolve(participantList);
  });
};

const createParticipant = async (userId, userType, conversationId) => {
  return new Promise(async (resolve) => {
    const newParticipant = Participant.build({
      userId,
      userType,
      conversationId,
    });
    await newParticipant.save();
    resolve(newParticipant);
  });
};

const createBulkParticipants = async (conversationId, participantIds) => {
  return new Promise(async (resolve) => {
    const participantList = participantIds.map((x) => {
      return {
        userId: x,
        userType: "userType",
        conversationId: conversationId,
      };
    });
    const newParticipants = Participant.bulkBuild(participantList);
    await newParticipants.save();
    resolve(newParticipants);
  });
};

const updateParticipant = async (participantId, userType) => {
  return new Promise(async (resolve) => {
    const participant = Participant.findOne({
      where: { id: participantId },
    });
    participant.userType = userType;
    await participant.save();
    resolve(participant);
  });
};

const deleteParticipant = async (participantId) => {
  return new Promise(async (resolve) => {
    const participant = await Participant.destroy({
      where: {
        id: participantId,
      },
    });
    resolve(participant.id);
  });
};

const participantRespository = {
  fetchParticipants,
  createParticipant,
  createBulkParticipants,
  updateParticipant,
  deleteParticipant,
};

module.exports = participantRespository;
