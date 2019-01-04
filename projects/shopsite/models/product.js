//-----------------------------------------------------------------------------
// Product Model object
//-----------------------------------------------------------------------------
const fs = require("fs");
const path = require("path");

//creates a path aiming to /data from the app root folder
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

//Generic function to read a file content and invoke a callback
const getProductsFromFile = callBack => {
  fs.readFile(p, (err, fileContent) => {
    !err ? callBack(JSON.parse(fileContent)) : callBack([]);
  });
};

// Product class definition
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        //update an existing product
        const existingProductIndex = products.findIndex(
          prod => prod.id == this.id
        );
        products[existingProductIndex] = this;
      } else {
        //generate a new product
        this.id = Math.random().toString();
        products.push(this);
      }

      fs.writeFile(p, JSON.stringify(products), err => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static delete(productId) {
    if (!productId) {
      throw new Error(
        "Impossible to delete a product. An id must be provided."
      );
    } else {
      getProductsFromFile(products => {
        const filteredItems = products.filter(prod => prod.id !== productId);
        fs.writeFile(p, JSON.stringify(filteredItems), err => {
          if (err) {
            console.log(err);
          }
        });
      });
    }
  }

  static fetchAll(callBack) {
    getProductsFromFile(callBack);
  }

  static findProductById(id, callBack) {
    getProductsFromFile(products => {
      const product = products.find(element => element.id === id);
      callBack(product);
    });
  }
};
