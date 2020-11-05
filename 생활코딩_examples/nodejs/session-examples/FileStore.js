var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var app = express()
 
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
    store:new FileStore()
}))
 
//조회수 구현 예제 단, 서버가 꺼지면 초기화 됨, 즉 휘발성 메모리


app.get('/', function (req, res, next) {
    console.log(req.session);
    if(req.session.num === undefined){
        req.session.num = 1;
    } else {
        req.session.num =  req.session.num + 1;
    }
    res.send(`Views : ${req.session.num}`);
})
 
app.listen(3000, function () {
    console.log('3000!');
});