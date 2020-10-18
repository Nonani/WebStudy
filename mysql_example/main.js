const express = require('express')
const http = require('http');
const fs = require('fs')
const url = require('url');
const qs = require('querystring');
// var bodyParser = require('body-parser');

var db_lib = require('./lib/conn_database.js');
const template = require('./lib/template.js');

var app = express();
// post data 받아오는 방법 1
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// 방법 2
app.use(express.urlencoded({ extended: false }));


var conn = db_lib.init();

//db 연결
db_lib.connect(conn);

app.get('/', function(req, res){
    var form = fs.readFileSync('./template/form.html', 'utf8');
    var html = template.HTML("login", form)
    return res.send(html);
});

app.post('/sign_in', function(req, res){
    var form = fs.readFileSync('./template/form.html', 'utf8');
    var html = template.HTML("Sign in", form)
    if(req.body===undefined){
        return res.status(200).send(html+'<br>Sign in failed!</br>')
    }else{
        var sql = 'SELECT * FROM user where id = ? and pwd = ?'
        
        conn.query(sql, [req.body.id, req.body.pwd], function(err, result, field){
            if(err) throw err;
            
            if(result.length===1){
                return res.status(200).send(html+'<br>Sign in success!</br>');
            }else{
                return res.status(200).send(html+'<br>Sign in failed!</br>');
            }
        });
    }
    
});

app.post('/sign_up', function(req, res){
    var form = fs.readFileSync('./template/form.html', 'utf8');
    var html = template.HTML("Sign up", form)
    if(req.body===undefined || req.body.id.length===0 || req.body.pwd.length===0){
        return res.status(200).send(html+'<br>Sign up failed!</br>')
    }else{
        // consoloe.log(req.body.id)
        // console.lg(req.body.pwd)
        var sql = "INSERT INTO user (id, pwd) VALUES (?, ?)";
        conn.query(sql, [req.body.id, req.body.pwd], function (err, result) {
            if (err) throw err;
            
            return res.status(200).send(html+'<br>Sign up success!</br>');
        });
    }
});



app.listen(4000, ()=>console.log("app listening on port 4000"));


// var app = http.createServer(function(request, response){
//     var pathname = url.parse(request.url, true).pathname;
//     var queryData = url.parse(request.url, true).query;
    
//     if(pathname === '/'){
//         var html = fs.readFileSync('form.html', 'utf8');
//         response.writeHead(200);
//         response.end(html);
//     }else if(pathname ==='/login'){
//         var html = fs.readFileSync('form.html', 'utf8');
//         var body = '';
//         request.on('data', function(data){
//             body += data;
//         });
//         request.on('end', function(){
//             var post = qs.parse(body);
//             conn.query('SELECT * FROM user where id = ? and pwd = ?', [post.id, post.pwd], function(err, result, field){
//                 if(err) throw err;

//                 if(result.length===1){
//                     response.writeHead(200);
//                     response.end(html+'<br>login success!</br>', 'utf8');
//                 }else{
//                     response.writeHead(200);
//                     response.end(html+'<br>login failed!</br>');
//                 }
//             });
//         });
        

//     }else{
//         response.writeHead(404);
//         response.end('Not Found!');
//     }
    
// });
// app.listen(4000);
