//-----------------------------------------------------------------------------
// Admin Routes Logic
//-----------------------------------------------------------------------------

const path = require("path");
const productsController = require("../controllers/products");

//Routes for admin
const express = require("express");
const router = express.Router();

router.get("/add-product", productsController.getAddProduct);
router.post("/add-product", productsController.postAddProduct);

module.exports = router;
