const WS_MESSAGE_EVENTS = require("../constants/websocketEvent.contant");
const messageRespository = require("../repository/message.repo");
const logger = require("../services/logger.service");

const messageWebsocketEventHandler = (socket) => {
  socket.on(WS_MESSAGE_EVENTS.CREATE_CONVERSATION, (conversationId) => {
    if (conversationId) socket.join(conversationId);
    logger.info(`user connected to room: ${conversationId}`);
  });

  socket.on(WS_MESSAGE_EVENTS.SEND_MESSAGE, async (newMessage, callback) => {
    if (
      !newMessage.conversationId ||
      !newMessage.messageType ||
      !newMessage.message
    ) {
      return callback({ success: false, error: "Invalid message format" });
    }

    try {
      newMessage = await messageRespository.createMessage(newMessage);

      socket.broadcast
        .to(newMessage.conversationId)
        .emit(WS_MESSAGE_EVENTS.RECIEVE_MESSAGE, newMessage);

      // Call the callback to notify the client of success
      callback({ success: true, data: newMessage });
    } catch (error) {
      // Call the callback to notify the client of an error
      callback({ success: false, error: "Failed to save message" });
    }
  });

  socket.on("disconnect", (conversationId) => {
    logger.log(conversationId);
    // if (conversationId) socket.leave(conversationId);
  });
};

module.exports = messageWebsocketEventHandler;
