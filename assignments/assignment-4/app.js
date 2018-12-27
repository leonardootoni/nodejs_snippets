//-----------------------------------------------------------------------------
// App module imports
//-----------------------------------------------------------------------------
const path = require("path");
const express = require("express");

//-----------------------------------------------------------------------------
// Defines the body parser and load Express framework
//-----------------------------------------------------------------------------
const bodyParser = require("body-parser");
const app = express();

//-----------------------------------------------------------------------------
// Defines the default template engine and the views folder
//-----------------------------------------------------------------------------
app.set("view engine", "ejs");
app.set("views", "views");

//-----------------------------------------------------------------------------
// Set the body parser. Must be declared before the router declaration
//-----------------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: false }));
//Defines the path to the public folder containing all static files (css, js, imgs, etc.)
app.use(express.static(path.join(__dirname, "public")));

//-----------------------------------------------------------------------------
// App route files import
//-----------------------------------------------------------------------------
const index = require("./routes/index");
const users = require("./routes/users");

//-----------------------------------------------------------------------------
// Register all App Routes defined in the Route files
//-----------------------------------------------------------------------------
app.use(index.routes);
app.use(users.routes);

//-----------------------------------------------------------------------------
// Generic middleware used for not found routes
//-----------------------------------------------------------------------------
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Not Found" });
});

//-----------------------------------------------------------------------------
// Starts the http server through expressjs
//-----------------------------------------------------------------------------
app.listen(3000);
