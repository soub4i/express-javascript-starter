const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./app/routes/routers");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
var compression = require("compression");

app.use(morgan("dev"));

app.use(bodyParser.json({ limit: "10mb" }));

app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));
const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  useNewUrlParser: true
};

app.use("/api/" + process.env.API_VERSION, routes());

mongoose
  .connect(process.env.DB_CONN, options)
  .then(() => console.log("connected to db"))
  .catch(err => console.error(err));

module.exports = app;
