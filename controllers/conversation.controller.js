const Conversation = require("../models/conversation.model");
const participantController = require("../controllers/participant.controller");

exports.fetchConversations = async (req, res, next) => {
  console.log("\n\n===> fetchConversations req.query", req.query);

  if (!req.query.userId) res.send({});
  const filterOption = {
    creatorId: req.query.userId,
  };

  if (req.query.conversationId) {
    filterOption["id"] = req.query.conversationId;
  }

  const conversationList = await User.findAll({
    where: filterOption,
  });

  res.status(200).json(conversationList);
};

exports.createConversation = async (req, res, next) => {
  console.log("\n\n===> createConversation req.body", req.body);

  if (
    !req.body.userId ||
    !req.body.conversationType ||
    !req.body.participantIds
  )
    res.send({});

  const newConversation = Conversation.build({
    type: req.body.conversationType,
  });
  await newConversation.save();

  req.body.conversationId = newConversation.id;
  participantController.createBulkParticipants(req, res, next);
};

exports.deleteConversation = async (req, res, next) => {
  console.log("\n\n===> deleteConversation req.query", req.query);

  if (!req.query.userId || !req.query.conversationId) res.send({});

  const conversation = Conversation.destroy({
    where: {
      creatorId: req.query.userId,
      id: req.query.conversationId,
    },
  });

  res.status(200).send(req.query.conversationId);
};
