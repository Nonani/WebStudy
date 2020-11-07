var express = require('express');
var router = express.Router();





router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

// router.post('/login_process', function(req, res, next) {
//     var sql = 'SELECT * FROM user where id = ? and pwd = ?'
      
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
