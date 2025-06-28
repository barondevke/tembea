const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "root",
<<<<<<< HEAD
  password: "",
  database: "tembea"
};

module.exports = mysql.createConnection(dbConfig)
=======
  password: "root",
  database: "tembea"
};

module.exports = mysql.createConnection(dbConfig);
>>>>>>> 57800982d6749719d583b4aa18131ca3de1269bf
