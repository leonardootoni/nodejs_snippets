//-----------------------------------------------------------------------------
// Products Controller
//-----------------------------------------------------------------------------
const Product = require("../models/product");
const Cart = require("../models/cart");

// shop products controller
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products"
    });
  });
};

// shop product detail controller
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findProductById(productId, product => {
    res.render("shop/product-detail", {
      pageTitle: product.title,
      product: product
    });
  });
};

//index page controller
exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/"
    });
  });
};

//cart page controller
exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart"
  });
};

//cart POST controller
exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findProductById(productId, product => {
    Cart.addProduct(productId, product.price);
  });

  console.log(productId);
  res.redirect("/cart");
};

//orders page controller
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "My Orders",
    path: "/orders"
  });
};

//cart page controller
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout"
  });
};
