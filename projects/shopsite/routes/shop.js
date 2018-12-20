const path = require("path");

const rootDir = require("../util/path");
const adminData = require("./admin");

//Routes for Shop
const express = require("express");
const router = express.Router();

//Defines the second middleware in line
router.get("/", (req, res, next) => {
  //get the list of producst from admin
  const products = adminData.products;
  res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
});

module.exports = router;
