const Participant = require("../models/participant.model");

exports.fetchParticipants = async (req, res, next) => {
  console.log("\n\n===> fetchParticipants req.query", req.query);

  if (!req.query.conversationId) res.send({});

  const participantList = await Participant.findAll({
    where: {
      conversationId: req.query.conversationId,
    },
  });

  res.status(200).json(participantList);
};

exports.createParticipant = async (req, res, next) => {
  console.log("\n\n===> createParticipant req.body", req.body);

  if (!req.body.userId || !req.body.userType || !req.body.conversationId)
    res.send({});

  const newParticipant = Participant.build({
    userId: req.body.userId,
    userType: req.body.userType,
    conversationId: req.body.conversationId,
  });
  await newParticipant.save();

  res.status(200).send(newParticipant);
};

exports.createBulkParticipants = async (req, res, next) => {
  console.log("\n\n===> createBulkParticipants req.body", req.body);

  if (!req.body.conversationId || !req.body.participantIds) res.send({});

  const participantList = req.body.participantIds.map((x) => {
    return {
      userId: x,
      userType: "userType",
      conversationId: req.body.conversationId,
    };
  });

  const newParticipants = Participant.bulkBuild(participantList);
  await newParticipants.save();

  res.status(200).send(newParticipants);
};

exports.updateParticipant = async (req, res, next) => {
  console.log("\n\n===> updateParticipant req.body", req.body);

  if (
    !req.body.data ||
    !req.body.data.userType ||
    !req.body.participantId ||
    !req.body.conversationId
  )
    res.send({});

  const participant = Participant.findOne({
    where: {
      id: req.body.participantId,
    },
  });
  participant.userType = req.body.data.userType;
  await participant.save();

  res.status(200).send(participant);
};

exports.deleteParticipant = async (req, res, next) => {
  console.log("\n\n===> deleteParticipant req.query", req.query);

  if (!req.query.participantId) res.send({});

  const participant = Participant.destroy({
    where: {
      id: req.query.participantId,
    },
  });

  res.status(200).send(req.query.participantId);
};
