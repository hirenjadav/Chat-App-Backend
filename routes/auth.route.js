const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/login", authController.loginWithPassword);

// router.post("/login/otp", authController.loginWithOtp);

router.post("/signup", authController.signup);

router.post("/otpverify", authController.otpVerify);

router.post("/logout", authController.logout);

module.exports = router;
