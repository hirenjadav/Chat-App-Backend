require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const db = require("./config/database.config");
const { createServer } = require("http");
const { Server } = require("socket.io");
const models = require("./models/index");
const socketConnection = require("./websocket/connection.ws");
const verfiyUserToken = require("./middlewares/userAuth.middleware");
const cors = require("cors");

// Express Instance
const app = express();

app.use(cors());

// Parsing Body for Incoming Request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Declare public folder as static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes declaration
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const conversationRoute = require("./routes/conversation.route");
const messageRoute = require("./routes/message.route");
const participantRoute = require("./routes/participant.route");
const errorHandler = require("./utils/ErrorHandler");
app.use("/auth", authRoute);
app.use("/user", verfiyUserToken, userRoute);
app.use("/conv", verfiyUserToken, conversationRoute);
app.use("/participant", verfiyUserToken, participantRoute);
app.use("/message", verfiyUserToken, messageRoute);

app.use(async (err, req, res, next) => {
  if (!errorHandler.isTrustedError(err))
    return errorHandler.handleApiError(err, res);
  return errorHandler.handleError(err, res);
});

// Web Socket Implementation.
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_DOMAIN || "http://localhost:5173",
  },
});
io.on("connection", socketConnection);

// Check database connection
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    const serverPort = process.env.PORT || 3000;
    app.listen(serverPort);
    console.log("Server listening on port " + serverPort + ".");

    const webSocketServerPort = process.env.WEB_SOCKET_PORT || 4000;
    io.listen(webSocketServerPort);
    console.log(
      "Web Socket Server listening on port " + webSocketServerPort + "."
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

db.sync({ alter: true })
  .then(() => {
    console.log("Database sync established successfully.");
  })
  .catch((error) => {
    console.error("Unable to sync the database:", error);
  });
