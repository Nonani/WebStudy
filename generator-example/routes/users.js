var express = require('express');
var router = express.Router();
var auth = require('../lib/auth')

var db = require('../lib/conn_database.js');
var conn = db.init();
db.connect(conn);   //db 연결

/* GET users listing. */

router.get('/', function(req, res, next) {
  
  res.send(auth.statusUI(req, res));

});


router.get('/board/write', function(req, res){
  res.render('write');
});

router.post('/board/write', function(req, res, next){
  var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title,content,passwd];
 
 
    var sql = "insert into board(name, title, content, regdate, modidate, passwd,hit) values(?,?,?,now(),now(),?,0)";
    conn.query(sql,datas, function (err, rows) {
        if (err) console.error("err : " + err);
        res.redirect('/users/board');
    });
});





router.get('/board', function(req, res, next) {
  res.redirect('/users/board/1');
 });

 
router.get('/board/:page', function(req, res, next) {
  var page = req.params.page;
  var sql = "select idx, name, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
      "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate from board";
  conn.query(sql, function (err, rows) {
      if (err) console.error("err : " + err);
      res.render('board', {title: '게시판 리스트', rows: rows});
  });
});


router.get('/board/read/:idx',function(req,res,next)
{
var idx = req.params.idx;
    var sql = "select idx, name, title, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board where idx=?";
    conn.query(sql,[idx], function(err,row)
    {
        if(err) console.error(err);
        res.render('read', {title:"글 상세", row:row[0]});
    });
});


router.post('/board/update',function(req,res,next)
{
    var idx = req.body.idx;
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title,content,idx,passwd];
 
 
    var sql = "update board set name=? , title=?,content=?, modidate=now() where idx=? and passwd=?";
    conn.query(sql,datas, function(err,result)
    {
        if(err) console.error(err);
        if(result.affectedRows == 0)
        {
            res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
        }
        else
        {
            res.redirect('/users/board');
        }
    });
});

module.exports = router;
