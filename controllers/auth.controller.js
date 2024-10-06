const responseHandler = require("../services/responseHandler.service");
const authRepository = require("../repository/auth.repo");
const HTTP400Error = require("../utils/Http400Error");
const jwt = require("jsonwebtoken");

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

    const token = jwt.sign({ userId: data.id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: process.env.JWT_TOKEN_EXPIRATION_DURATION + "h",
    });
    responseHandler.sendSuccessResponse(res, token);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {};
