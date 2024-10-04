const userRepository = require("../repository/user.repo");
const errorHandler = require("../services/errorHandler.service");
const responseHandler = require("../services/responseHandler.service");

exports.fetchUsers = async (req, res, next) => {
  console.log("\n\n===> fetchUsers req.query", req.query);

  const filterOption = {};
  if (req.query.userId) {
    filterOption["id"] = req.query.userId;
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
      return errorHandler.throwBadRequestError(res);
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
    console.log(error);
    return errorHandler.throwServerError(res);
  }
};

exports.updateUser = async (req, res, next) => {
  console.log("\n\n===> updateUser req.body", req.body);

  if (!req.body.id) return errorHandler.throwBadRequestError(res);

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
    console.log(error);
    return errorHandler.throwServerError(res);
  }
};

exports.deleteUser = async (req, res, next) => {
  console.log("\n\n===> deleteUser req.query", req.query);

  if (!req.query.userId) return errorHandler.throwBadRequestError(res);

  try {
    const data = await userRepository.deleteUser(req.query.userId);
    responseHandler.sendSuccessResponse(res, data);
  } catch (error) {
    console.log(error);
    errorHandler.throwServerError(res);
  }
};
