const Conversation = require("../models/conversation.model");
const participantRespository = require("./participant.repo");

const fetchConversations = async (filterOption) => {
  try {
    const conversationList = await User.findAll({ where: filterOption });
    return conversationList; // Return the fetched conversations
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const createConversation = async (userId, conversationType, participantIds) => {
  try {
    const newConversation = await Conversation.create({
      creatorId: userId,
      type: conversationType,
    });

    // Add participants in bulk
    await participantRespository.createBulkParticipants(
      newConversation.id,
      participantIds
    );

    return newConversation; // Return the newly created conversation
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const deleteConversation = async (userId, conversationId) => {
  try {
    const conversation = await Conversation.destroy({
      where: {
        creatorId: userId,
        id: conversationId,
      },
    });

    return conversationId; // Return the conversation ID for confirmation
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const conversationRespository = {
  fetchConversations,
  createConversation,
  deleteConversation,
};

module.exports = conversationRespository;
