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
  // Product.create({
  //   title: req.body.title,
  //   price: Number(req.body.price),
  //   imageUrl: req.body.imageUrl,
  //   description: req.body.description,
  //   userId: req.user.id
  // })
  /*
    Another way to create a product through Sequelize Associations
    Once there is an association of product with user, Sequelize allows to invoke a method createEntityName()
    and then, pass all atributes from that Entity.
    In this case, an user has many products, which means, user.createProduct(...)
    user set in the request from app.js
  */
  req.user
    .createProduct({
      title: req.body.title,
      price: Number(req.body.price),
      imageUrl: req.body.imageUrl,
      description: req.body.description
    })
    .then(result => {
      res.redirect("/");
    })
    .catch(error => console.log(error));
};

// Edit product (GET)
exports.getEditProduct = (req, res, next) => {
  const editing = req.query.edit === "true" ? true : false;
  if (!editing) {
    return res.redirect("/");
  }

  const productId = req.params.productId;
  req.user
    .getProducts({ where: { id: productId } })
    //Product.findByPk(productId)
    .then(products => {
      const product = products[0]; //getProducts always will return an array.
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        product: product,
        editing: editing,
        submitAction: "/admin/edit-product"
      });
    })
    .catch(error => console.error(error));
};

// Edit product (POST)
exports.postEditProduct = (req, res, next) => {
  Product.findByPk(req.body.productId)
    .then(product => {
      product.title = req.body.title;
      product.imageUrl = req.body.imageUrl;
      product.price = req.body.price;
      product.description = req.body.description;
      return product.save();
    })
    .then(result => {
      res.redirect("/admin/products");
    })
    .catch(error => {
      console.error(error);
      res.redirect("/admin/products");
    });
};

//Delete product (POST)
exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.destroy({ where: { id: productId } })
    .then(numRowsDeleted => {
      res.redirect("/admin/products");
    })
    .catch(error => {
      console.error(error);
    });
};

// admin/products controller
exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    //Product.findAll()
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Products Administration",
        path: "/admin/products"
      });
    })
    .catch(error => console.error(error));
};
