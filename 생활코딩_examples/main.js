const http = require('http');
const fs = require('fs')
const url = require('url');
var template = require('./lib/template.js')

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;
    var description = 'Node.js'

    if(pathname === '/'){
        console.log(title);
        if(title === undefined){
            title = 'Hi!';
            response.writeHead(200);
            response.end(template.HTML(title, description));
        }else{
            fs.readFile(`${queryData.id}`, 'utf8', function(err, description){
                if(err) throw err;
                console.log(description);
                response.writeHead(200);
                response.end(template.HTML(title, description));
            });
        }
    }else{
        response.writeHead(404);
        response.end('Not Found');
    }
    
    });
app.listen(3000);