const userRepository = require("../repository/user.repo");
const errorHandler = require("../services/errorHandler.service");
const responseHandler = require("../services/responseHandler.service");
const APIError = require("../utils/ApiError");
const HTTP400Error = require("../utils/Http400Error");

exports.fetchUsers = async (req, res, next) => {
  console.log("\n\n===> fetchUsers req.query", req.query);

  const filterOption = {};
  // if (req.query.userId) {
  //   filterOption["id"] = req.query.userId;
  // }
  if (req.query.search) {
    filterOption["search"] = req.query.search;
  }
  const userList = await userRepository.fetchUsers(filterOption);

  return responseHandler.sendSuccessResponse(res, userList);
};

exports.createUser = async (req, res, next) => {
  console.log("\n\n===> createUser req.body", req.body);

  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !req.body.phoneCountryCode ||
      !req.body.phoneNumber ||
      !req.body.password
    ) {
      throw new HTTP400Error();
    }

    const newUserData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneCountryCode: req.body.phoneCountryCode,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    };
    const newUser = await userRepository.createUser(newUserData);

    return responseHandler.sendSuccessResponse(res, newUser);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  console.log("\n\n===> updateUser req.body", req.body);

  if (!req.body.id) throw new HTTP400Error();

  try {
    const updateUserData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneCountryCode: req.body.phoneCountryCode,
      phoneNumber: req.body.phoneNumber,
    };
    const user = await userRepository.updateUser(req.body.id, updateUserData);
    return responseHandler.sendSuccessResponse(res, user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  console.log("\n\n===> deleteUser req.query", req.query);

  if (!req.query.userId) throw new HTTP400Error();

  try {
    const data = await userRepository.deleteUser(req.query.userId);
    responseHandler.sendSuccessResponse(res, data);
  } catch (error) {
    next(error);
  }
};
