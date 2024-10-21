const WS_MESSAGE_EVENTS = require("../constants/websocketEvent.contant");
const logger = require("../services/logger.service");

const conversationWebsocketEventHandler = (socket) => {
  socket.on(WS_MESSAGE_EVENTS.JOIN_CONVERSATION, (conversationId) => {
    if (conversationId) socket.join(conversationId);
    logger.info(`user connected to room: ${conversationId}`);
  });

  socket.on(WS_MESSAGE_EVENTS.LEAVE_CONVERSATION, (conversationId) => {
    if (conversationId) socket.leave(conversationId);
    logger.info(`user left room: ${conversationId}`);
  });
};

module.exports = conversationWebsocketEventHandler;
