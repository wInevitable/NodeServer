var socketio = require('socket.io');

var createChat = function (server) {
  var io = socketio.listen(server);
  
  io.sockets.on('connection', function (socket) {
    // io.sockets.emit('message', { text: 'this is the text' });
    // socket.emit('news', { hello: 'world' });
    // socket.on('my other event', function (data) {
    //   console.log(data);
    // });
    
    socket.on('message', function (data) {
  	  io.sockets.emit('message', { text: data.text });
  	});
  }); 
};

module.exports.createChat = createChat;