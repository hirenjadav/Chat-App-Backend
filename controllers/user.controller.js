const User = require("../models/user");
const db = require("../utils/database");

exports.createUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phoneCountryCode,
    phoneNumber,
    password,
  } = req.body;

  const newUser = User.build({
    firstName,
    lastName,
    email,
    phoneCountryCode,
    phoneNumber,
    password,
  });

  await newUser.save();
};

exports.findUser = async (req, res, next) => {
  const user = await User.findAll({
    where: {
      id: req.body.id,
    },
  });
  console.log(user);
};

exports.findAllUser = async (req, res, next) => {
  const users = await User.findAll();
  console.log(users.every((user) => user instanceof User));
};
