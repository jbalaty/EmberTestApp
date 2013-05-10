var connect = require('connect'),
    http = require('http');

//starting server on port 
var port = 3001;
console.log("Creating connect server on port: "+port);
server = connect.createServer(
    connect.favicon()
  , connect.logger()
  , connect.static(__dirname + '/public')
)
server.listen(port)
