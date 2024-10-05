const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const ERROR_CODES = require("../constants/errorCodes.constant");
const BaseError = require("../utils/BaseError");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");

const login = async (phoneNumber) => {
  try {
    const user = await User.findOne({ where: { phoneNumber } });

    if (!user) {
      throw new BaseError(HTTP_STATUS_CODE.OK, ERROR_CODES.USER_NOT_FOUND);
    }

    const otpValue = generateOtp();

    await Otp.create({
      userId: user.id,
      value: otpValue,
      expireAt: new Date(), // Set the expiration time appropriately
    });

    return null; // You might want to return something like a success message or the OTP for testing
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const otpVerify = async (phoneNumber, otp) => {
  try {
    const user = await User.findOne({ where: { phoneNumber } });

    if (!user)
      throw new BaseError(HTTP_STATUS_CODE.OK, ERROR_CODES.USER_NOT_FOUND);

    const otpEntry = await Otp.findOne({ where: { userId: user.id } });

    if (!otpEntry)
      throw new BaseError(HTTP_STATUS_CODE.OK, ERROR_CODES.OTP_NOT_FOUND);

    // Verify the OTP
    if (otpEntry.value == otp) {
      return user; // Return the user if OTP matches
    } else {
      return null; // Return null if OTP doesn't match
    }
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
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
