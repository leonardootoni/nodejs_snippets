//External dependencies
const http = require("http");
const routes = require("./routes");

//starts the server assinging a specific router
const server = http.createServer(routes.handler);
server.listen(3000);
