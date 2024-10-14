const Conversation = require("../models/conversation.model");
const participantRespository = require("./participant.repo");
const Participant = require("../models/participant.model");
const User = require("../models/user.model");
const Message = require("../models/message.model");
const messageRespository = require("./message.repo");

const fetchConversations = async (filterOption) => {
  try {
    const conversationList = await Conversation.findAll({
      attributes: ["id", "name", "type", "profilePicture"],
      where: filterOption,
      include: [
        {
          model: Participant,
          include: [
            {
              model: User,
              attributes: [
                "id",
                "firstName",
                "lastName",
                "email",
                "phoneNumber",
              ],
            },
          ],
        },
      ],
    });

    return mapConversationList(userId, conversationList); // Return the fetched conversations
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const fetchConversationList = async (userId, filterOption = {}) => {
  try {
    const conversationList = await Conversation.findAll({
      attributes: ["id", "name", "type", "profilePicture"],
      where: filterOption,
      include: [
        {
          model: Participant,
          where: { userId },
          attributes: ["id", "userType", "userId"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName", "email", "phoneNumber"],
            },
          ],
        },
      ],
    });

    const mappedConversationList = await mapConversationList(conversationList);

    return mappedConversationList; // Return the fetched conversations
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const createConversation = async (userId, conversationType, participantIds) => {
  try {
    const existingConversation = await Conversation.findAll({
      attributes: ["id", "name", "type", "profilePicture"],
      where: { type: conversationType },
      include: [
        {
          model: Participant,
          where: {
            userId: [userId, ...participantIds],
          },
          include: [
            {
              model: User,
              attributes: [
                "id",
                "firstName",
                "lastName",
                "email",
                "phoneNumber",
              ],
            },
          ],
        },
      ],
    });

    if (existingConversation.length) return existingConversation[0];

    const newConversation = await Conversation.create({
      creatorId: userId,
      type: conversationType,
    });

    participantIds = [userId, ...participantIds];

    // Add participants in bulk
    const participants = await participantRespository.createBulkParticipants(
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

const mapConversationList = async (list) => {
  return Promise.all(
    list.map(async (chat) => {
      const latestMessage = await messageRespository.fetchLatestMessage(
        chat.id
      );
      const participants = await participantRespository.fetchParticipants(
        chat.id
      );

      return {
        id: chat.id,
        name: chat.name,
        type: chat.type,
        participants,
        latestMessage,
      };
    })
  );
};

const conversationRespository = {
  fetchConversations,
  fetchConversationList,
  createConversation,
  deleteConversation,
};

module.exports = conversationRespository;
