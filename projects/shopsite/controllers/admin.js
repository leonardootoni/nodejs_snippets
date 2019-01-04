//-----------------------------------------------------------------------------
// Admin Controller - Administrative Functions
//-----------------------------------------------------------------------------
const Product = require("../models/product");

//add product controller
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    submitAction: "/admin/add-product"
  });
};

// post product controller
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => res.redirect("/"))
    .catch(error => console.error(error));
};

// Edit product (GET)
exports.getEditProduct = (req, res, next) => {
  const editing = req.query.edit === "true" ? true : false;
  if (!editing) {
    return res.redirect("/");
  }

  const productId = req.params.productId;
  Product.findProductById(productId)
    .then(([product]) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        product: product[0],
        editing: editing,
        submitAction: "/admin/edit-product"
      });
    })
    .catch(error => {
      console.error(error);
    });
};

// Edit product (POST)
exports.postEditProduct = (req, res, next) => {
  const product = new Product(
    req.body.id,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  );

  product.save();
  res.redirect("/admin/products");
};

//Delete product (POST)
exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.delete(productId);
  res.redirect("/admin/products");
};

// admin/products controller
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("admin/products", {
        prods: rows,
        pageTitle: "Products Administration",
        path: "/admin/products"
      });
    })
    .catch(error => {
      console.error(error);
    });
};
