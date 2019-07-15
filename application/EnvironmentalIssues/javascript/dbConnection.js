var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '127.0.0.1', //change to Localhost
  user: 'root', //change to root
  password: 'csc6481',
  database: 'EnvironMate'
})


module.exports = connection;