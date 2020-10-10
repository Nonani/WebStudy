var http = require('http');
var fs = require('fs')
var url = require('url');

function templateHTML(title, description){
  return `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              <ol>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
              </ol>
              <h2>${title}</h2>
              <p>${description}
              </p>
            </body>
            </html>
            `;
}

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
            var template = templateHTML(title, description);
            response.writeHead(200);
            response.end(template);
        }else{
            fs.readFile(`${queryData.id}`, 'utf8', function(err, description){
                if(err) throw err;
                console.log(description);
                var template = templateHTML(title, description);
                response.writeHead(200);
                response.end(template);
            });
        }
    }else{
        response.writeHead(404);
        response.end('Not Found');
    }
    
    });
app.listen(3000);