(function(root) {
  var ChatApp = root.ChatApp = (root.ChatApp || {});
  
  var Chat = ChatApp.Chat = function(socket) {
    this.socket = socket;
  };
  
  Chat.prototype.sendMessage = function(text) {
    this.socket.emit('message', { text: text });
  };
  
})(this);