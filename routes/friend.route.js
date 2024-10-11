const express = require("express");
const router = express.Router();

const friendshipController = require("../controllers/friend.controller");

router.post("/create", friendshipController.createFriendship);

router.put("/update", friendshipController.updateFriendship);

router.delete("/delete", friendshipController.deleteFriendship);

router.get("", friendshipController.fetchFriends);

module.exports = router;
