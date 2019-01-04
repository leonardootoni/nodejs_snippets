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
    //fetch previous cart
    getCartFromFile(cart => {
      //Analyse the cart => find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === Number(productId)
      );
      const existingProduct = cart.products[existingProductIndex];
      let product;
      if (!existingProduct) {
        product = {
          id: Number(productId),
          qty: 1,
          price: Number(productPrice)
        };
        cart.products = [...cart.products, product];
      } else {
        //Add new product and increase quantity
        product = { ...existingProduct };
        product.qty = product.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = product;
      }

      //Save the cart in the FS
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) {
          throw err;
        }
      });
    });
  }

  static update(productId, qty) {
    getCartFromFile(cart => {
      const productIndex = cart.products.findIndex(
        prod => prod.id === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].qty = qty;
        let a = JSON.stringify(cart);

        fs.writeFile(p, JSON.stringify(cart), err => {
          if (err) {
            throw err;
          }
        });
      } else {
        throw new Error("Product to update not found");
      }
    });
  }

  static delete(productId) {
    if (!productId) {
      throw new Error(
        "Impossible to delete a product. An id must be provided."
      );
    } else {
      getCartFromFile(cart => {
        //Recover all products from cart except that one with the provided productId
        const filteredItems = cart.products.filter(
          product => product.id != productId
        );

        cart.products = [...filteredItems];
        fs.writeFile(p, JSON.stringify(cart), err => {
          if (err) {
            throw err;
          }
        });
      });
    }
  }

  static getCartProducts(callBack) {
    getCartFromFile(cart => {
      callBack(cart);
    });
  }
};
