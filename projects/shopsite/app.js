const path = require("path");
const express = require("express");

//import app route files
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//Defines the body parser and load Express.js framework
const bodyParser = require("body-parser");
const app = express();

//defines the default template engine and the views folder
app.set("view engine", "ejs");
app.set("views", "views");

//Defines the body parser. Must be declared before the router declaration
app.use(bodyParser.urlencoded({ extended: false }));
//Defines the path to the public folder containing all static files (css, js, imgs, etc.)
app.use(express.static(path.join(__dirname, "public")));

//register all routes defined in the route files
app.use(shopRoutes);
app.use("/admin", adminData.routes);

//Generic middleware used for not found routes
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Not Found" });
});

//starts the http server through expressjs
app.listen(3000);
