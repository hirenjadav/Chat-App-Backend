const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message.controller");

router.post("/create", messageController.createMessage);

router.put("/update", messageController.updateMessage);

router.delete("/delete", messageController.deleteMessage);

router.get("", messageController.fetchMessages);

module.exports = router;
