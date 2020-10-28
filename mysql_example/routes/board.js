
var express = require('express');
var router = express.Router();
var db_lib = require('./lib/conn_database.js');
var conn = db_lib.init();
db_lib.connect(conn);   //db 연결

router.get('/list/:page', function(req, res){
    var page = req.params.page;
    var sql = "select id, name, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate from board";
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('list', {title: '게시판 리스트', rows: rows});
    });
})


module.exports = router;