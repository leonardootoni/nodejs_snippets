//-----------------------------------------------------------------------------
// Products Controller
//-----------------------------------------------------------------------------
const Product = require("../models/product");
const Cart = require("../models/cart");

// shop products controller
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products"
      });
    })
    .catch(error => console.error(error));
};

// shop product detail controller
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then(product => {
      res.render("shop/product-detail", {
        pageTitle: product.title,
        product: product
      });
    })
    .catch(error => console.error(error));
};

//index page controller
exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/"
      });
    })
    .catch(error => console.error(error));
};

//cart page controller
exports.getCart = (req, res, next) => {
  Cart.getCartProducts(cartProducts => {
    res.render("shop/cart", {
      pageTitle: "Your Cart",
      path: "/cart",
      cartProducts: cartProducts
    });
  });
};

//cart POST controller
exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findProductById(productId, product => {
    try {
      Cart.addProduct(productId, product.price);
    } catch (error) {
      res.status(500).send({
        status: "Error trying to add a product in the cart. Message: " + error
      });
    }
  });

  res.redirect("/cart");
};

// Delete a product from the cart. Receives a AJAX request
exports.postDeleteProductFromCart = (req, res, next) => {
  const productId = req.body.productId;
  try {
    Cart.delete(productId);
  } catch (error) {
    res.status(500).send({
      status: "Error trying to delete a product in the cart. Message: " + error
    });
  }

  res.send({ status: "received" });
};

// Update product's amount in the cart. Receives a AJAX request
exports.putUpdateCartAmount = (req, res, next) => {
  const productId = Number(req.body.productId);
  const qty = Number(req.body.qty);
  Cart.update(productId, qty);
  res.send({ status: "updated" });
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
