
var express = require('express');
var router = express.Router();
var passport = require('passport')

var db_lib = require('../lib/conn_database.js');
var conn = db_lib.init();
db_lib.connect(conn);   //db 연결



router.get('/', function(req, res){
    res.render('../view/index.ejs', { title: 'Index!' });
})


//using passport

//without passport
router.post('/sign_in', function(req, res){


    
    var sql = 'SELECT * FROM user where id = ? and pwd = ?'
        
    conn.query(sql, [req.body.id, req.body.pwd], function(err, result, field){
        if(err) throw err;
        
        if(result.length===1){  
            res.render('../view/index.ejs', { title: 'Login Success!' });
        }else{
            res.render('../view/index.ejs', { title: 'Login Fail!' });
        }
    });
    res.end();
});

router.post('/sign_up', function(req, res){
    res.send('sign up!');
});

module.exports = router;