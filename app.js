require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const db = require("./config/database.config");
const { createServer } = require("http");
const { Server } = require("socket.io");
const models = require("./models/index");
const socketConnection = require("./websocket/connection.ws");

// Express Instance
const app = express();

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
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/conv", conversationRoute);
app.use("/participant", participantRoute);
app.use("/message", messageRoute);

// Web Socket Implementation.
const httpServer = createServer(app);
const io = new Server(httpServer);
io.on("connection", socketConnection);

// Check database connection
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    const port = process.env.PORT || 4000;
    app.listen(port);
    console.log("Server listening on port " + port + ".");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

db.sync()
  .then(() => {
    console.log("Database sync established successfully.");
  })
  .catch((error) => {
    console.error("Unable to sync the database:", error);
  });
