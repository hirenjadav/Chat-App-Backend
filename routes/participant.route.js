const express = require("express");
const router = express.Router();

const participantController = require("../controllers/participant.controller");

router.post("/create", participantController.createParticipant);

router.put("/update", participantController.updateParticipant);

router.delete("/delete", participantController.deleteParticipant);

router.get("", participantController.fetchParticipants);

module.exports = router;
