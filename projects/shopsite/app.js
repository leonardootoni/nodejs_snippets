const path = require("path");
//import expressjs
const express = require("express");

//import app route files
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//Defines the body parser and load Express.js framework
const bodyParser = require("body-parser");
const app = express();

//defines the default template engine
app.set("view engine", "pug");

//Defines the body parser. Must be declared before the router declaration
app.use(bodyParser.urlencoded({ extended: false }));
//Defines the path to the public folder containing all static files (css, js, imgs, etc.)
app.use(express.static(path.join(__dirname, "public")));

//register all routes defined in the route files
app.use(shopRoutes);
app.use("/admin", adminData.routes);

//Generic middleware used for not found routes
app.use((req, res, next) => {
  //res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", { cache: true, pageTitle: "Not Found" });
});

//starts the http server through expressjs
app.listen(3000);
