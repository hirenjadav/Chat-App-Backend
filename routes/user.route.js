const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/create", userController.createUser);

router.put("/update", userController.createUser);

router.get("", userController.findAllUser);

module.exports = router;
