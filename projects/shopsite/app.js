//-----------------------------------------------------------------------------
// App modules imports
//-----------------------------------------------------------------------------
const path = require("path");
const express = require("express");

const errorsController = require("./controllers/errors");
const sequelize = require("./util/database");

//-----------------------------------------------------------------------------
// App route files import
//-----------------------------------------------------------------------------
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

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
app.use(bodyParser.json());
//Defines the path to the public folder containing all static files (css, js, imgs, etc.)
app.use(express.static(path.join(__dirname, "public")));

//-----------------------------------------------------------------------------
// Register all App Routes defined in the Route files
//-----------------------------------------------------------------------------
app.use(shopRoutes);
app.use("/admin", adminRoutes);

//-----------------------------------------------------------------------------
// Generic middleware used for not found routes - 404 Not Found
//-----------------------------------------------------------------------------
app.use(errorsController.getHTTP_404);

//-----------------------------------------------------------------------------
// Sync database models and then starts the http server through expressjs
//-----------------------------------------------------------------------------
sequelize
  .sync()
  .then(result => app.listen(3000))
  .catch(error => console.error(error));
