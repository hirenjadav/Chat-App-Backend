const WS_MESSAGE_EVENTS = require("../constants/websocketEvent.contant");
const messageRespository = require("../repository/message.repo");
const messageStatusController = require("../controllers/messageStatus.controller");

const messageWebsocketEventHandler = (socket) => {
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

      socket.emit(WS_MESSAGE_EVENTS.CHAT_LIST_NEW_MESSAGE, newMessage);
      socket.broadcast.emit(
        WS_MESSAGE_EVENTS.CHAT_LIST_NEW_MESSAGE,
        newMessage
      );

      // Call the callback to notify the client of success
      callback({ success: true, data: newMessage });
    } catch (error) {
      // Call the callback to notify the client of an error
      callback({ success: false, error: "Failed to save message" });
    }
  });

  socket.on(WS_MESSAGE_EVENTS.UPDATE_MESSAGE, async (message, callback) => {
    if (!message.messageId) {
      return callback({ success: false, error: "Message not found." });
    }

    try {
      message = await messageRespository.updateMessage(
        message.messageId,
        message
      );

      socket.broadcast
        .to(message.conversationId)
        .emit(WS_MESSAGE_EVENTS.RECIEVE_MESSAGE, message);

      // Call the callback to notify the client of success
      callback({ success: true, data: message });
    } catch (error) {
      // Call the callback to notify the client of an error
      callback({ success: false, error: "Failed to save message" });
    }
  });

  socket.on(WS_MESSAGE_EVENTS.UPDATE_MESSAGE_STATUS, async (data, callback) => {
    try {
      await messageStatusController.updateMultipleSingleUserMessageStatus(data);
    } catch (error) {}
  });
};

module.exports = messageWebsocketEventHandler;
