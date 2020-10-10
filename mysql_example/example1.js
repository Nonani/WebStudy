var mysql = require('mysql');
var db_info = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '111111',
    database: 'opentutorials'
}

var conn = mysql.createConnection(db_info);
conn.connect();
conn.query('SELECT * FROM author', function(err, rows, fields) {
    if (err) {
      console.log(err);
    }
    console.log(rows);
    
  
  });
  conn.end();
