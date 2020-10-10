var http = require('http');
var fs = require('fs')
var url = require('url');
var qs = require('querystring');

var db_lib = require('./conn_database.js')

var conn = db_lib.init();

db_lib.connect(conn);
var app = http.createServer(function(request, response){
    var pathname = url.parse(request.url, true).pathname;
    var queryData = url.parse(request.url, true).query;
    
    if(pathname === '/'){
        var html = fs.readFileSync('form.html', 'utf8');
        response.writeHead(200);
        response.end(html);
    }else if(pathname ==='/login'){
        var html = fs.readFileSync('form.html', 'utf8');
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            conn.query('SELECT * FROM user where id = ? and pwd = ?', [post.id, post.pwd], function(err, result, field){
                if(err) throw err;

                if(result.length===1){
                    response.writeHead(200);
                    response.end(html+'<br>login success!</br>', 'utf8');
                }else{
                    response.writeHead(200);
                    response.end(html+'<br>login failed!</br>');
                }
            });
        });
        

    }else{
        response.writeHead(404);
        response.end('Not Found!');
    }
    
});
app.listen(4000);
