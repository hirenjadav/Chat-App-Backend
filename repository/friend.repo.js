const Friend = require("../models/friend.model");
const { Op } = require("sequelize");
const ERROR_CODES = require("../constants/errorCodes.constant");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");
const BaseError = require("../utils/BaseError");

const fetchFriends = async (filterOption = {}) => {
  try {
    const friendList = await Friend.findAll({ where: filterOption });
    return friendList;
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const createFriendship = async (data) => {
  const { userId1, userId2 } = data;

  try {
    const friendRelation = await Friend.findOne({
      where: {
        [Op.or]: [
          { [Op.and]: [{ userId1 }, { userId2 }] },
          { [Op.and]: [{ userId2 }, { userId1 }] },
        ],
      },
    });

    if (friendRelation != null)
      throw new BaseError(
        HTTP_STATUS_CODE.OK,
        ERROR_CODES.FRIENDSHIP_ALREADY_EXIST
      );

    const newFriends = Friend.build({
      userId1,
      userId2,
    });
    await newFriends.save();

    return newFriends;
  } catch (error) {
    // Error handling here (e.g., logging or passing it to middleware)
    throw error;
  }
};

const updateFriendship = async (friendshipId, data) => {
  const { userNickName1, userNickName2 } = data;

  try {
    const friend = await Friend.findOne({ where: { id: friendshipId } });

    if (friend == null)
      throw new BaseError(
        HTTP_STATUS_CODE.OK,
        ERROR_CODES.FREINDSHIP_NOT_FOUND
      );

    if (userNickName1) friend.userNickName1 = userNickName1;
    if (userNickName2) friend.userNickName2 = userNickName2;

    await friend.save();

    return friend;
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const deleteFriendship = async (id) => {
  try {
    await Friend.destroy({ where: { id } });
    return id;
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const friendRepository = {
  fetchFriends,
  createFriendship,
  updateFriendship,
  deleteFriendship,
};

module.exports = friendRepository;
