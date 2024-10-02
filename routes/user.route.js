const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post("/create", userController.createUser);

router.put("/update", userController.updateUser);

router.delete("/delete", userController.deleteUser);

router.get("", userController.fetchUsers);

module.exports = router;
