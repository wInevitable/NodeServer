var http = require('http');
var router = require('./router');


var server = http.createServer(function(req, res) {
  router.start(req, res);
});

server.listen(8080);
console.log('Server running at localhost:8080');

var createChat = require('./lib/chat_server').createChat;

createChat(server);