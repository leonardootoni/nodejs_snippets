//-----------------------------------------------------------------------------
// Defina a DataBase Connection
//-----------------------------------------------------------------------------
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "nodejs",
  database: "node-complete",
  password: "nodejs@nodejs"
});

module.exports = pool.promise();
