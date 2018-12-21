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

  /* PUG render() definition
  res.render("shop", {
    cache: true,
    prods: products,
    pageTitle: "Shop",
    path: "/"
  });
   */

  /* Handlebars render() definition */
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;
