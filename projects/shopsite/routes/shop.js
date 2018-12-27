//-----------------------------------------------------------------------------
// Shop Routes Logic
//-----------------------------------------------------------------------------

const path = require("path");

const productsController = require("../controllers/products");

//Routes for Shop
const express = require("express");
const router = express.Router();

//Defines the second middleware in line
router.get("/", productsController.getProducts);

module.exports = router;
