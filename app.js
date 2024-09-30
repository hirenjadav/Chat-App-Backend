require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const db = require("./utils/database");

const userRoute = require("./routes/user.route");

// Express Instance
const app = express();

// Parsing Body for Incoming Request
app.use(bodyParser.urlencoded({ extended: false }));

// Declare public folder as static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRoute);

const UserModel = require("./models/user");
const ConversationModel = require("./models/conversation");
const ParticipantModel = require("./models/participant");
const MessageModel = require("./models/message");

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
