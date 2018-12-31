//-----------------------------------------------------------------------------
// Shop Routes Logic
//-----------------------------------------------------------------------------

const path = require("path");

const shopController = require("../controllers/shop");

//Routes for Shop
const express = require("express");
const router = express.Router();

//Defines the second middleware in line
router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);

router.get("/orders", shopController.getOrders);
router.get("/checkout", shopController.getCheckout);

module.exports = router;
