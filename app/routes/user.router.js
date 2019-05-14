const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/user.controller");

function userRouter() {
  router.get("/", UsersController.getAll);

  router.get("/:id", UsersController.get);

  router.get("/find/:key/:value", UsersController.find);

  router.post("/", UsersController.create);

  router.put("/:id", UsersController.update);

  router.delete("/:id", UsersController.delete);

  return router;
}

module.exports = userRouter;
