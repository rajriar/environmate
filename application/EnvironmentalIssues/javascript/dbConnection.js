var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '54.67.108.149', //change to Localhost
  user: 'root', //change to root
  password: 'csc6481',
  database: 'EnvironMate'
})

if(connection.state === 'disconnected'){
  connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
  });
}

module.exports = connection;