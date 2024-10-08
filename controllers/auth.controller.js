const responseHandler = require("../services/responseHandler.service");
const authRepository = require("../repository/auth.repo");
const HTTP400Error = require("../utils/Http400Error");
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/user.repo");

exports.loginWithOtp = async (req, res, next) => {
  console.log("\n\n===> loginWithOtp req.body", req.body);

  if (!req.body.number) throw new HTTP400Error();
  try {
    const data = await authRepository.loginWithOtp(req.body.number);
    responseHandler.sendSuccessResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  console.log("\n\n===> signup req.body", req.body);

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

    const accessToken = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: process.env.JWT_TOKEN_EXPIRATION_DURATION + "h",
      }
    );

    const response = {
      ...newUser,
      accessToken,
    };

    responseHandler.sendSuccessResponse(res, response);
  } catch (error) {
    next(error);
  }
};

exports.loginWithPassword = async (req, res, next) => {
  console.log("\n\n===> loginWithPassword req.body", req.body);

  if (!req.body.email || !req.body.password) throw new HTTP400Error();

  try {
    const data = await userRepository.passwordVerify(
      req.body.email,
      req.body.password
    );

    const accessToken = jwt.sign(
      { userId: data.id },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: process.env.JWT_TOKEN_EXPIRATION_DURATION + "h",
      }
    );

    const response = {
      ...data,
      accessToken,
    };

    responseHandler.sendSuccessResponse(res, response);
  } catch (error) {
    next(error);
  }
};

exports.otpVerify = async (req, res, next) => {
  console.log("\n\n===> otpVerify req.body", req.body);

  if (!req.body.number || !req.body.otp) throw new HTTP400Error();

  try {
    const data = await authRepository.otpVerify(req.body.number, req.body.otp);

    const token = jwt.sign({ userId: data.id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: process.env.JWT_TOKEN_EXPIRATION_DURATION + "h",
    });
    responseHandler.sendSuccessResponse(res, token);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {};
