const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const ERROR_CODES = require("../constants/errorCodes.constant");
const BaseError = require("../utils/BaseError");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");

const login = async (phoneNumber) => {
  return new Promise(async (resolve) => {
    const user = await User.findOne({
      where: { phoneNumber },
    });

    if (user == null)
      throw new BaseError(HTTP_STATUS_CODE.OK, ERROR_CODES.USER_NOT_FOUND);

    const otpValue = generateOtp();

    Otp.build({
      userId: user.id,
      value: otpValue,
      expireAt: new Date(),
    });

    resolve(null);
  });
};

const otpVerify = async (phoneNumber, otp) => {
  return new Promise(async (resolve) => {
    const user = await User.findOne({
      where: { phoneNumber },
    });

    if (user == null)
      throw new BaseError(HTTP_STATUS_CODE.OK, ERROR_CODES.USER_NOT_FOUND);

    const otpEntry = await Otp.findOne({
      where: { userId: user.id },
    });

    if (otpEntry == null)
      throw new BaseError(HTTP_STATUS_CODE.OK, ERROR_CODES.OTP_NOT_FOUND);

    if (otpEntry.value === otp) {
      resolve(user);
    } else {
      resolve(null);
    }
  });
};

const logout = async () => {};

const generateOtp = () => {
  const otpLength = 6;
  const digits = "0123456789";
  const OTP = "";
  const len = digits.length;
  for (let i = 0; i < otpLength; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  }
  return OTP;
};

const authRepository = {
  login,
  logout,
  otpVerify,
};

module.exports = authRepository;
