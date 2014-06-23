(function(root) {
  var ChatApp = root.ChatApp = (root.ChatApp || {});
  var socket = io.connect();
  
  
  var getInput = function(chat, text){
    chat.sendMessage(text);
  }
  
  $(document).ready(function() {
    var chat = new ChatApp.Chat(socket);
    
    socket.on("message", function(message){
      $('#messages').append(message.text + "<br>");
    });
    
    $('#submit-form').submit(function(event){
      event.preventDefault();
      
      var formData = $(event.currentTarget).serializeJSON();
      
      getInput(chat, formData.message.text);
    });
  });
})(this);