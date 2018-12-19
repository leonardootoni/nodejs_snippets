//Default routes for Users

const path = require("path");
const rootDir = require("../util/path");

//routes definition
const express = require("express");
const router = express.Router();

router.get("/users", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "users.html"));
});

router.post("/users-add", (req, res, next) => {
  const userName = req.body.username; //property from the submited form
  const msg = `The user ${userName} was successfully added`;
  console.log(msg);
  res.redirect("/");
});

module.exports = router;
