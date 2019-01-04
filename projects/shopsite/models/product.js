//-----------------------------------------------------------------------------
// Product Model object
//-----------------------------------------------------------------------------
const db = require("../util/database");

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
    return db.execute(
      "insert into products (title, price, imageUrl, description) values (?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static delete(productId) {}

  static fetchAll() {
    return db.execute("select * from products");
  }

  static findProductById(id) {
    return db.execute("select * from products where products.id = ? ", [id]);
  }
};
