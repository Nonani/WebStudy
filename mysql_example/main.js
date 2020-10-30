const express = require('express')
const http = require('http');
const fs = require('fs')
const url = require('url');
const qs = require('querystring');
// var bodyParser = require('body-parser');



var app = express();
// post data 받아오는 방법 1
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// 방법 2
app.use(express.urlencoded({ extended: false }));
app.set('view engine','ejs');

app.set('view engine','ejs');
app.use('/', require('./routes/index.js'));


// app.post('/sign_in', function(req, res){
//     var form = fs.readFileSync('./template/form.html', 'utf8');
//     var html = template.HTML("Sign in", form)
//     if(req.body===undefined){
//         return res.status(200).send(html+'<br>Sign in failed!</br>')
//     }else{
//         var sql = 'SELECT * FROM user where id = ? and pwd = ?'
        
//         conn.query(sql, [req.body.id, req.body.pwd], function(err, result, field){
//             if(err) throw err;
            
//             if(result.length===1){
//                 return res.status(200).send(html+'<br>Sign in success!</br>');
//             }else{
//                 return res.status(200).send(html+'<br>Sign in failed!</br>');
//             }
//         });
//     }
    
// });

// app.post('/sign_up', function(req, res){
//     var form = fs.readFileSync('./template/form.html', 'utf8');
//     var html = template.HTML("Sign up", form)
//     if(req.body===undefined || req.body.id.length===0 || req.body.pwd.length===0){
//         return res.status(200).send(html+'<br>Sign up failed!</br>')
//     }else{
//         // consoloe.log(req.body.id)
//         // console.lg(req.body.pwd)
//         var sql = "INSERT INTO user (id, pwd) VALUES (?, ?)";
//         conn.query(sql, [req.body.id, req.body.pwd], function (err, result) {
//             if (err) throw err;
            
//             return res.status(200).send(html+'<br>Sign up success!</br>');
//         });
//     }
// });



app.listen(4000, ()=>console.log("app listening on port 4000"));
