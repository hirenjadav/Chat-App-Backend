const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();

const db = require("./utils/database");

// Express Instance
const app = express();

// Parsing Body for Incoming Request
app.use(bodyParser.urlencoded({ extended: false }));

// Declare public folder as static folder
app.use(express.static(path.join(__dirname, "public")));

// Check database connection
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

    let port = process.env.PORT || 4000;
    app.listen(port);
    console.log("Server listening on port " + port + ".");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
