//Default routes for /

const path = require("path");
const rootDir = require("../util/path");

//routes definition
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "index.html"));
});

module.exports = router;
