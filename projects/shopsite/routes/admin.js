const path = require("path");

const rootDir = require("../util/path");

//Routes for admin
const express = require("express");
const router = express.Router();

const products = [];

router.get("/add-product", (req, res, next) => {
  //res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("add-product", { cache: true, pageTitle: "Add Product", path: "/admin/add-product" });
});

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
