const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const ERROR_CODES = require("../constants/errorCodes.constant");
const HTTP_STATUS_CODE = require("../constants/httpStatusCode.constant");
const BaseError = require("../utils/BaseError");

const passwordEncrytSalt = 10;

const fetchUsers = async (filterOption = {}) => {
  try {
    const filterCondition = {};
    if (filterOption.search) {
      filterCondition[Op.or] = [
        { firstName: { [Op.substring]: filterOption.search } },
        { lastName: { [Op.substring]: filterOption.search } },
        { email: { [Op.substring]: filterOption.search } },
      ];
    }
    if (filterOption.id) filterCondition["id"] = filterOption.id;

    const userList = await User.findAll({ where: filterCondition });
    return userList.map((x) => mapUserDetails(x));
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const createUser = async (data) => {
  const {
    firstName,
    lastName,
    email,
    phoneCountryCode,
    phoneNumber,
    password,
  } = data;

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ phoneNumber }, { email }],
      },
    });

    if (user != null) {
      if (user.phoneNumber == phoneNumber)
        throw new BaseError(
          HTTP_STATUS_CODE.OK,
          ERROR_CODES.USER_NUMBER_ALREADY_EXIST
        );

      if (user.email == email)
        throw new BaseError(
          HTTP_STATUS_CODE.OK,
          ERROR_CODES.USER_EMAIL_ALREADY_EXIST
        );
    }

    const hashedPassword = await bcrypt.hash(password, passwordEncrytSalt);
    const newUser = User.build({
      firstName,
      lastName,
      email,
      phoneCountryCode,
      phoneNumber,
      password: hashedPassword,
    });
    await newUser.save();

    return mapUserDetails(newUser);
  } catch (error) {
    // Error handling here (e.g., logging or passing it to middleware)
    throw error;
  }
};

const updateUser = async (userId, data) => {
  const { firstName, lastName, email, phoneCountryCode, phoneNumber } = data;

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (user == null)
      throw new BaseError(HTTP_STATUS_CODE.OK, ERROR_CODES.USER_NOT_FOUND);

    // Update fields if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phoneCountryCode) user.phoneCountryCode = phoneCountryCode;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    // Save the updated user
    await user.save();

    // Return the mapped user details
    return mapUserDetails(user);
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    await User.destroy({ where: { id: userId } });
    return userId; // Return the userId to indicate successful deletion
  } catch (error) {
    // Handle or log the error, then re-throw it if necessary
    throw error;
  }
};

const passwordVerify = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user)
      throw new BaseError(HTTP_STATUS_CODE.OK, ERROR_CODES.USER_NOT_FOUND);

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
      throw new BaseError(
        HTTP_STATUS_CODE.OK,
        ERROR_CODES.USER_PASSWORD_INVALID
      );

    return mapUserDetails(user);
  } catch (error) {
    throw error;
  }
};

const mapUserDetails = (data) => {
  return {
    id: data["id"],
    isActive: data["isActive"],
    firstName: data["firstName"],
    lastName: data["lastName"],
    fullName: data["firstName"] + " " + data["lastName"],
    email: data["email"],
    phoneCountryCode: data["phoneCountryCode"],
    phoneNumber: data["phoneNumber"],
    profilePicture: data["profilePicture"] ? data["profilePicture"] : null,
  };
};

const userRepository = {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  passwordVerify,
};

module.exports = userRepository;
