const friendRepository = require("../repository/friend.repo");
const logger = require("../services/logger.service");
const responseHandler = require("../services/responseHandler.service");
const HTTP400Error = require("../utils/Http400Error");

exports.fetchFriends = async (req, res, next) => {
  logger.log("fetchFriends req.query", req.query);

  const filterOption = {};
  if (req.query.userId) {
    filterOption["id"] = req.query.userId;
  }
  const friends = await friendRepository.fetchFriends(filterOption);

  return responseHandler.sendSuccessResponse(res, friends);
};

exports.createFriendship = async (req, res, next) => {
  logger.log("createFriendship req.body", req.body);

  try {
    if (!req.body.userId1 || !req.body.userId2) throw new HTTP400Error();

    const newFriendsData = {
      userId1: req.body.userId1,
      userId2: req.body.userId2,
    };
    const newFriends = await friendRepository.createFriendship(newFriendsData);

    return responseHandler.sendSuccessResponse(res, newFriends);
  } catch (error) {
    next(error);
  }
};

exports.updateFriendship = async (req, res, next) => {
  logger.log("updateFriendship req.body", req.body);

  if (!req.body.userNickName1 || !req.body.userNickName2)
    throw new HTTP400Error();

  try {
    const updateFriendsData = {
      userNickName1: req.body.userNickName1,
      userNickName2: req.body.userNickName2,
    };
    const friends = await friendRepository.updateFriendship(
      req.body.id,
      updateFriendsData
    );
    return responseHandler.sendSuccessResponse(res, friends);
  } catch (error) {
    next(error);
  }
};

exports.deleteFriendship = async (req, res, next) => {
  logger.log("deleteFriendship req.query", req.query);

  if (!req.query.id) throw new HTTP400Error();

  try {
    const data = await friendRepository.deleteFriendship(req.query.id);
    responseHandler.sendSuccessResponse(res, data);
  } catch (error) {
    next(error);
  }
};
