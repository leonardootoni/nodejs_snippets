//-----------------------------------------------------------------------------
// App modules imports
//-----------------------------------------------------------------------------
const path = require("path");
const express = require("express");

const errorsController = require("./controllers/errors");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

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

//--temporary: Set a user for all incoming requests
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user; //sets a sequelize object, not only a json data
      next();
    })
    .catch(error => console.error(error));
});

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

//Entity associations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  //.sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "Leo", email: "leonardootoni@gmail.com" });
    } else {
      return user;
    }
  })
  .then(result => {
    //console.log(result);
    app.listen(3000);
  })
  .catch(error => console.error(error));
