var mysql = require('mysql');
var db_info = {
    host: 'localhost',
    port: '5306',
    user: 'root',
    password: '1234',
    database: 'example'
}
module.exports={
  init: function(){
    return mysql.createConnection(db_info);
  },
  connect: function(conn){
    conn.connect(function(err){
      if(err) console.error('connect fail : '+ err);
      // else console.log('connected successfully!');
    });
  },
  end: function(){
    console.log('db 연결 종료!')
    conn.end();
  }
}

  
