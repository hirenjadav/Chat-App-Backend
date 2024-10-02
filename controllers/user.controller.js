const User = require("../models/user.model");

exports.fetchUsers = async (req, res, next) => {
  console.log("\n\n===> fetchUsers req.query", req.query);

  const filterOption = {};
  if (req.query.userId) {
    filterOption["id"] = req.query.userId;
  }

  const userList = await User.findAll({ where: filterOption });

  res.status(200).json(userList);
};

exports.createUser = async (req, res, next) => {
  console.log("\n\n===> createUser req.body", req.body);

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

  res.status(200).send(newUser);
};

exports.updateUser = async (req, res, next) => {
  console.log("\n\n===> updateUser req.body", req.body);

  const { firstName, lastName, email, phoneCountryCode, phoneNumber } =
    req.body;

  const user = await User.findOne({ where: { id: req.body.id } });
  console.log(user);

  if (user != null) {
    if (firstName) user.firstName = firstName;

    if (lastName) user.lastName = lastName;

    if (email) user.email = email;

    if (phoneCountryCode) user.phoneCountryCode = phoneCountryCode;

    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).send(user);
  } else {
    res.status(200).send({});
  }
};

exports.deleteUser = async (req, res, next) => {
  console.log("\n\n===> deleteUser req.query", req.query);

  if (!req.query.userId) res.send({});

  const user = User.destroy({
    where: { id: req.query.userId },
  });

  res.status(200).send(req.query.userId);
};
