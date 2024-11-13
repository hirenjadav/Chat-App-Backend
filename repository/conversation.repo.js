const Conversation = require("../models/conversation.model");
const participantRespository = require("./participant.repo");
const Participant = require("../models/participant.model");
const User = require("../models/user.model");
const messageRespository = require("./message.repo");
const { Sequelize } = require("../config/database.config");
const CONVERSATION_TYPES = require("../constants/conversationType.constant");
const MessageStatus = require("../models/messageStatus.model");
const MESSAGE_STATUS_TYPES = require("../constants/messageStatusType.constant");
const { mapUserDetails } = require("./user.repo");
const { Op } = require("sequelize");

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

    return mapConversationList(conversationList); // Return the fetched conversations
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const fetchConversationList = async (userId, filterOption = {}) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
      include: {
        model: Conversation,
        where: filterOption,
      },
    });

    if (!user) return [];

    const mappedConversationList = await mapConversationList(
      user.conversations,
      user.id
    );
    return mappedConversationList;
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const createConversation = async (
  userId,
  conversationType,
  participantIds,
  conversationName
) => {
  try {
    participantIds = [userId, ...participantIds];

    if (conversationType == CONVERSATION_TYPES.PERSONAL) {
      let conversationListUserIds = await Participant.findAll({
        attributes: [
          "conversationId",
          [Sequelize.fn("GROUP_CONCAT", Sequelize.col("userId")), "userIds"],
        ],
        group: ["conversationId"],
      });

      const existingConversations = conversationListUserIds
        .map((x) => {
          x = x.dataValues;
          return {
            ...x,
            userIds: x.userIds.split(","),
          };
        })
        .filter((x) => {
          if (x.userIds.length != participantIds.length) return false;
          return participantIds.every((p) => x.userIds.includes(p));
        });

      if (existingConversations.length) {
        const existingConversation = await Conversation.findOne({
          where: {
            id: existingConversations[0]["conversationId"],
          },
        });
        return existingConversation;
      }
    }

    const newConversation = await Conversation.create({
      creatorId: userId,
      type: conversationType,
      name: conversationName ? conversationName : null,
    });

    await Promise.all(
      participantIds.map(async (id) => {
        await newConversation.setUsers(id);
      })
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

const mapConversationList = async (list, userId = null) => {
  return Promise.all(
    list.map(async (chat) => {
      const latestMessage = await messageRespository.fetchLatestMessage(
        chat.id
      );
      const participantUsers = await chat.getUsers();

      const participants = participantUsers.map((x) => ({
        ...mapUserDetails(x),
        lastSeenMessageTime: x.participant.lastSeenMessageTime,
      }));

      const unseenMessageCount = await MessageStatus.count({
        where: {
          [Op.not]: {
            status: MESSAGE_STATUS_TYPES.SEEN,
          },
        },
        include: {
          model: Participant,
          where: {
            conversationId: chat.id,
            userId: userId,
          },
        },
      });

      return {
        id: chat.id,
        name: chat.name,
        type: chat.type,
        participants,
        latestMessage,
        unseenMessageCount,
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
