var express = require('express')
var cookieParser = require('cookie-parser')
var app = express();

app.use(cookieParser());

app.get('/test', function(req, res){
    //Read Cookie
    console.log(req.cookies);

    //Send Cookie
    res.cookie('basicCookie', 'basicValue');
    res.cookie('permanentCookie', 'permanentValue',  { maxAge: 9000, httpOnly: false });
    res.cookie('httpOnlyCookie', 'httpOnlyValue',  { httpOnly: true });
    res.cookie('pathCookie', 'pathValue', { path: '/test' }) // 해당 path의 상위로 이동할 시에 사라짐
    // res.cookie('domainCookie', 'domainValue', { domain: 'test.org' })
    //해당 도메인의 어떤 서브 도메인에서도 살아남는 쿠키

    res.end('cookie_test');
});

app.listen(3000, ()=>console.log("cookie app listening on port 3000"));