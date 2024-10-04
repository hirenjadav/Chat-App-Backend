const Conversation = require("../models/conversation.model");
const participantRespository = require("./participant.repo");

const fetchConversations = async (filterOption) => {
  return new Promise(async (resolve) => {
    const conversationList = await User.findAll({ where: filterOption });
    resolve(conversationList);
  });
};

const createConversation = async (userId, conversationType, participantIds) => {
  return new Promise(async (resolve) => {
    const newConversation = Conversation.build({
      creatorId: userId,
      type: conversationType,
    });
    await newConversation.save();
    participantRespository.createBulkParticipants(
      newConversation.id,
      participantIds
    );
  });
};

const deleteConversation = async (userId, conversationId) => {
  return new Promise(async (resolve) => {
    const conversation = Conversation.destroy({
      where: {
        creatorId: userId,
        id: conversationId,
      },
    });
    resolve(conversation.id);
  });
};

const conversationRespository = {
  fetchConversations,
  createConversation,
  deleteConversation,
};

module.exports = conversationRespository;
