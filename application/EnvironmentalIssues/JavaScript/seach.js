var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'csc6481',
  database: 'EnviornMate'
})

if(!connection.connect()){
    console.log("Unable to connect to Data Base");
}



connection.end();