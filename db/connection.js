const util = require("util");
const mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "employee_DB"
  });
  
  connection.connect();

  connection.query = util.promisify(connection.query);

  module.exports = connection;
  
