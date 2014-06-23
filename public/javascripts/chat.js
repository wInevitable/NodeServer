(function(root) {
  var ChatApp = root.ChatApp = (root.ChatApp || {});
  
  var Chat = ChatApp.Chat = function(socket) {
    this.socket = socket;
    this.room = "lobby";
  };
  
  Chat.prototype.sendMessage = function(text) {
    this.socket.emit('message', { text: text });
  };
  
  Chat.prototype.changeName = function(name) {
    this.socket.emit('nicknameChangeRequest', { nickname: name });
  };
  
  Chat.prototype.changeRoom = function(room) {
    this.room = room;
    this.socket.emit('roomChangeRequest', room);
    this.sendMessage("Switched to " + room);
  };
  
})(this);