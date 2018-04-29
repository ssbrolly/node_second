var http = require('http');
var path = require('path');
var home = require('./routes/home');
var fs = require('fs');
var todos = require('./routes/todos');
var server = http.createServer();
var port = '8080'
var address = ' http://localhost:' + port

function router(method, url, res) {
  switch(url) {
    case '/':
      return home(method, res); 
    case '/todos':
      return todos(method, res); 
    default:
      fs.readFile(path.join(__dirname, 'views', '404.html'), function(err, content){
        res.end(content);
      })
  }
}

server.on('request', function(request, response) {
  var method = request.method;
  var url = request.url;
  var headers = request.headers;
  var body = [];
  
  request.on('data', function(chunk) {
    body.push(chunk);
    console.log(chunk); 
  });

  request.on('end', function(){
    response.setHeader('Content-Type', 'text/html');
    response.on('error', function(err) {
      response.statuscode = 500;
      response.end('Error: ', err)
    });

    router(method, url, response);
  });
}); 
server.listen(port);
console.log('Server listening on' + address);