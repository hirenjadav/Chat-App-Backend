const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);

router.post("/otpverify", authController.otpVerify);

router.post("/logout", authController.log);

module.exports = router;
