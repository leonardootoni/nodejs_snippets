const path = require("path");

const rootDir = require("../util/path");

//Routes for Shop
const express = require("express");
const router = express.Router();

//Defines the second middleware in line
router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
