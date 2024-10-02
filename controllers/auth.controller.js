const User = require("../models/user.model");
const Otp = require("../models/otp.model");

exports.login = async (req, res, next) => {
  console.log("\n\n===> login req.body", req.body);

  if (req.body?.number) {
    const user = await User.findOne({
      where: { phoneNumber: req.body.number },
    });
    console.log(user);

    if (user != null) {
      const otpValue = generateOtp();

      Otp.build({
        userId: user.id,
        value: otpValue,
        expireAt: new Date(),
      });
    }

    res.send({});
  } else {
    res.send({});
  }
};

exports.otpVerify = async (req, res, next) => {
  console.log("\n\n===> otpVerify req.body", req.body);

  if (req.body?.number && req.body?.otp) {
    const user = await User.findOne({
      where: { phoneNumber: req.body.number },
    });
    console.log(user);

    if (user == null) res.status(200).send({});

    const otpEntry = await Otp.findOne({
      where: { userId: req.body.otp },
    });

    if (otpEntry == null) res.status(200).send({});

    console.log(otpEntry);

    res.send({});
  } else {
    res.send({});
  }
};

exports.logout = async (req, res, next) => {};

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
