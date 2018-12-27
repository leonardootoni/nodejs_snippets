//-----------------------------------------------------------------------------
// Products Controller
//-----------------------------------------------------------------------------

const products = [];

exports.getAddProduct = (req, res, next) => {
  //res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("add-product", {
    cache: true,
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeProduct: true,
    formsCSS: true,
    productCSS: true
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  res.render("shop", {
    cache: true,
    prods: products,
    pageTitle: "Shop",
    path: "/"
  });
};
