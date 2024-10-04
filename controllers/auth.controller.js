const errorHandler = require("../services/errorHandler.service");
const responseHandler = require("../services/responseHandler.service");
const ERROR_CODES = require("../constants/errorCodes.constant");
const authRepository = require("../repository/auth.repo");

exports.login = async (req, res, next) => {
  console.log("\n\n===> login req.body", req.body);

  if (!req.body.number) return errorHandler.throwBadRequestError(res);
  try {
    const data = await authRepository.login(req.body.number);
    responseHandler.sendSuccessResponse(res, data);
  } catch (error) {
    console.log(error);
    errorHandler.throwServerError(res);
  }
};

exports.otpVerify = async (req, res, next) => {
  console.log("\n\n===> otpVerify req.body", req.body);

  if (!req.body.number || !req.body.otp)
    return errorHandler.throwBadRequestError(res);

  try {
    const data = await authRepository.otpVerify(req.body.number, req.body.otp);
    responseHandler.sendSuccessResponse(res, data);
  } catch (error) {
    console.log(error);
    errorHandler.throwServerError(res);
  }
};

exports.logout = async (req, res, next) => {};
