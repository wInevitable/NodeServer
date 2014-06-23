var socketio = require('socket.io');
var _ = require('lodash');
var guestNumber = 1;
var nicknames = {};
var currentRooms = {};

var joinRoom = function(socket, io, room){
  socket.join(room);
  currentRooms[socket.id] = room;
  io.sockets.in(room).emit('message',{
    text: (nicknames[socket.id] + " has entered the " + room + "."),
    room: room,
    name: "Admin"
  });
};

var handleRoomChangeRequests = function(socket, io){
  socket.on('roomChangeRequest', function(room) {
    var oldRoom = currentRooms[socket.id];
    socket.leave(oldRoom);
    joinRoom(socket, io, room);
    io.sockets.emit('roomList', getRoomData(io));
  });
};

var getRoomData = function(io){
  var roomHash = io.sockets.manager.rooms;
  var roomData = {};
  _.each(_.keys(roomHash), function(key){
    var socketIDs = roomHash[key];
    var usernames = _.map(socketIDs, function(id){
      return nicknames[id];
    });
    roomData[key] = usernames;
  });
  return roomData;
};

var createChat = function (server) {
  var io = socketio.listen(server);
  
  io.sockets.on('connection', function (socket) {
    nicknames[socket.id] = "User " + guestNumber;
    guestNumber += 1;
    
    joinRoom(socket, io, "lobby");
    handleRoomChangeRequests(socket, io);
    // io.sockets.emit('message', { text: 'this is the text' });
    // socket.emit('news', { hello: 'world' });
    // socket.on('my other event', function (data) {
    //   console.log(data);
    // });
    socket.on('nicknameChangeRequest', function(data) {
      nicknames[socket.id] = data.nickname;
      socket.emit('nicknameChangeResult', { nickname: data.nickname });      
    });
    
    socket.on('message', function (data) {
  	  io.sockets.emit('message', {
        text: data.text,
        name: nicknames[socket.id],
        room: data.room
      });
  	});
  }); 
};

module.exports.createChat = createChat;