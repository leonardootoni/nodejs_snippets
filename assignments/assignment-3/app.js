//Initial imports
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

//Server definition
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//Static Files Folder Definition
app.use(express.static(path.join(__dirname, "public")));

//Routes Definition
const usersRoutes = require("./routes/users");
const rootRoutes = require("./routes/root");
app.use(usersRoutes);
app.use(rootRoutes);

//Default 404 route
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

//Server initialization
app.listen(3000);
