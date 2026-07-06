require('dotenv').config();
const mysql = require("mysql2/promise");
require("dotenv").config();


const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: "railway"
};

module.exports = mysql.createConnection(dbConfig)