//-----------------------------------------------------------------------------
// Define a DataBase Connection
//-----------------------------------------------------------------------------
/* provide a direct connection pool to the database through mysql2 driver
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "nodejs",
  database: "node-complete",
  password: "nodejs@nodejs"
});

module.exports = pool.promise();
*/

//provide database pool connection using sequelize, that also uses mysql2 driver
const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-complete", "nodejs", "nodejs@nodejs", {
  dialect: "mysql",
  host: "localhost",
  operatorsAliases: Sequelize.Op
});

module.exports = sequelize;
