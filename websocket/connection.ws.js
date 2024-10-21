const logger = require("../services/logger.service");
const conversationWebsocketEventHandler = require("./conversation.ws");
const messageWebsocketEventHandler = require("./messages.ws");

const socketConnection = (socket) => {
  // socketConnectionCallbacks(socket);

  messageWebsocketEventHandler(socket);

  conversationWebsocketEventHandler(socket);
};

const socketConnectionCallbacks = (socket) => {
  logger.log("initial transport", socket.conn.transport.name); // prints "polling"

  socket.conn.once("upgrade", () => {
    // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
    logger.log("upgraded transport", socket.conn.transport.name); // prints "websocket"
  });

  socket.conn.on("packet", ({ type, data }) => {
    // called for each packet received
  });

  socket.conn.on("packetCreate", ({ type, data }) => {
    // called for each packet sent
  });

  socket.conn.on("drain", () => {
    // called when the write buffer is drained
  });

  socket.conn.on("close", (reason) => {
    // called when the underlying connection is closed
  });
};

module.exports = socketConnection;
