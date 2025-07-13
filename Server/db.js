const mysql = require("mysql2/promise");
require("dotenv").config();


const dbConfig = {
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "tembea"
};

module.exports = mysql.createConnection(dbConfig)