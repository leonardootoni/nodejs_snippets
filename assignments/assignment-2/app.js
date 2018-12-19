const express = require("express");
const app = express();

app.use("/users", (req, resp, next) => {
  resp.send("<h1>This is a users page</h1>");
});

app.use("/", (req, resp, next) => {
  resp.send("<h1>Hello Word Assignment 2!</h1>");
});

app.listen(3000);
