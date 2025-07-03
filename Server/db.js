const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "tembea"
};

module.exports = mysql.createConnection(dbConfig)
