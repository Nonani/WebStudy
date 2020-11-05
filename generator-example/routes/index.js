var express = require('express');
var router = express.Router();
var db = require('../config/conn_database.js');
var conn = db.init();
db.connect(conn);   //db 연결

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign_in', function(req, res){

  var sql = 'SELECT * FROM user where id = ? and pwd = ?'
      
  conn.query(sql, [req.body.id, req.body.pwd], function(err, result, field){
      if(err) throw err;
      
      if(result.length===1){  
          res.render('index', { title: 'Login Success!' });
      }else{
          res.render('index', { title: 'Login Fail!' });
      }
  });
});

module.exports = router;
