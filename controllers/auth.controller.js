const errorHandler = require("../services/errorHandler.service");
const responseHandler = require("../services/responseHandler.service");
const ERROR_CODES = require("../constants/errorCodes.constant");
const authRepository = require("../repository/auth.repo");
const APIError = require("../utils/ApiError");
const HTTP400Error = require("../utils/Http400Error");

exports.login = async (req, res, next) => {
  console.log("\n\n===> login req.body", req.body);

  if (!req.body.number) throw new HTTP400Error();
  try {
    const data = await authRepository.login(req.body.number);
    responseHandler.sendSuccessResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.otpVerify = async (req, res, next) => {
  console.log("\n\n===> otpVerify req.body", req.body);

  if (!req.body.number || !req.body.otp) throw new HTTP400Error();

  try {
    const data = await authRepository.otpVerify(req.body.number, req.body.otp);
    responseHandler.sendSuccessResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {};
