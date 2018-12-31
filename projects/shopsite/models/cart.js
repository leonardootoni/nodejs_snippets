//-----------------------------------------------------------------------------
// Cart Model object
//-----------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");

//creates a path aiming to /data from the app root folder
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

const getCartFromFile = callBack => {
  fs.readFile(p, (err, fileContent) => {
    let cart = { products: [], totalPrice: 0 };
    !err ? callBack(JSON.parse(fileContent)) : callBack(cart);
  });
};

module.exports = class Cart {
  static addProduct(productId, productPrice) {
    console.log(productId, productPrice);
    //fetch previous cart
    getCartFromFile(cart => {
      //Analyse the cart => find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === productId
      );
      const existingProduct = cart.products[existingProductIndex];
      let product;
      if (!existingProduct) {
        product = { id: productId, qty: 1 };
        cart.products = [...cart.products, product];
      } else {
        //Add new product and increase quantity
        product = { ...existingProduct };
        product.qty = product.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = product;
      }

      cart.totalPrice = cart.totalPrice + +productPrice;
      //Save the cart in the FS
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
};
