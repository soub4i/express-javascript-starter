const express = require("express");
require("dotenv").config();
const userRouter = require("./user.router");

function apiRouter() {
  const router = express.Router();

  router.use("/users", userRouter());

  return router;
}

module.exports = apiRouter;
