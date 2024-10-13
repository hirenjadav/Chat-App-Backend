const express = require("express");
const router = express.Router();

const conversationController = require("../controllers/conversation.controller");

router.get("", conversationController.fetchConversations);

router.get("/list", conversationController.fetchConversationList);

router.post("/create", conversationController.createConversation);

router.delete("/delete", conversationController.deleteConversation);

module.exports = router;
