var express = require('express');
var router = express.Router();
var auth = require('../lib/auth')

// var db = require('../config/conn_database.js');
// var conn = db.init();
// db.connect(conn);   //db 연결

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/board', function(req, res, next) {
  
  res.send(auth.statusUI(req, res));

});

// router.post('/sign_in', function(req, res){

//   var sql = 'SELECT * FROM user where id = ? and pwd = ?'
      
//   conn.query(sql, [req.body.id, req.body.pwd], function(err, result, field){
//       if(err) throw err;
      
//       if(result.length===1){  
//           res.render('index', { title: 'Login Success!' });
//       }else{
//           res.render('index', { title: 'Login Fail!' });
//       }
//   });
// });

module.exports = router;
