var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost', //change to Localhost
  user: 'root', //change to root
  password: 'csc6481',
  database: 'environmate'
})

if(connection.state === 'disconnected'){
  connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
  });
}

module.exports = connection;
