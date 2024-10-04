const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const passwordEncrytSalt = 10;

const fetchUsers = async (filterOption = {}) => {
  return new Promise(async (resolve) => {
    const userList = await User.findAll({ where: filterOption });
    resolve(userList);
  });
};

const createUser = async (data) => {
  return new Promise(async (resolve) => {
    const {
      firstName,
      lastName,
      email,
      phoneCountryCode,
      phoneNumber,
      password,
    } = data;
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
    const mappedUser = mapUserDetails(newUser);
    resolve(mappedUser);
  });
};

const updateUser = async (userId, data) => {
  return new Promise(async (resolve) => {
    const { firstName, lastName, email, phoneCountryCode, phoneNumber } = data;

    const user = await User.findOne({ where: { id: userId } });

    if (user == null) {
      // return responseHandler.sendFailureResponse(
      //   res,
      //   ERROR_CODES.USER_NOT_FOUND
      // );
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phoneCountryCode) user.phoneCountryCode = phoneCountryCode;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();
    const mappedUser = mapUserDetails(user);
    resolve(mappedUser);
  });
};

const deleteUser = async (userId) => {
  return new Promise(async (resolve) => {
    await User.destroy({ where: { id: userId } });
    resolve(userId);
  });
};

const mapUserDetails = (data) => {
  return {
    id: data["id"],
    isActive: data["isActive"],
    firstName: data["firstName"],
    lastName: data["lastName"],
    email: data["email"],
    phoneCountryCode: data["phoneCountryCode"],
    phoneNumber: data["phoneNumber"],
  };
};

const userRepository = {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
};

module.exports = userRepository;
