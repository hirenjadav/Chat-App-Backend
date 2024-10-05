const ERROR_CODES = require("./errorCodes.constant");

const errorCodeDescription = {
  [ERROR_CODES.OTP_NOT_FOUND]: "Otp not found",
  [ERROR_CODES.USER_NOT_FOUND]: "User not found",
};

module.exports = errorCodeDescription;
