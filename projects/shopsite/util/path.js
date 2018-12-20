const path = require("path");

//Get the absolute directory from the main js file
module.exports = path.dirname(process.mainModule.filename);
