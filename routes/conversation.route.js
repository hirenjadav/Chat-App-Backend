const express = require("express");
const router = express.Router();

const conversationController = require("../controllers/conversation.controller");

router.post("/create", conversationController.createConversation);

router.delete("/delete", conversationController.deleteConversation);

router.get("", conversationController.fetchConversations);

module.exports = router;
