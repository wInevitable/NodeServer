(function(root) {
  var ChatApp = root.ChatApp = (root.ChatApp || {});
  var socket = io.connect();
  
  
  var getInput = function(chat, text){
    if (text[0] === "/") {
      var command = text.split(" ")[0].slice(1);
      var request = text.split(" ")[1];
      switch (command){
        case "nick":
          chat.changeName(request);
          break;
        case "join":
          chat.changeRoom(request);
          break;
        default:
          break;
      };
    } else {
        chat.sendMessage(text);
    }
  }
  
  $(document).ready(function() {
    var chat = new ChatApp.Chat(socket);
    
    socket.on("message", function(message){
       $('#messages').append("<b>" + message.name + "</b>: " + message.text + "<br>"); 
    });
    
    socket.on("nicknameChangeResult", function(nicknameChangeResult){
      $('#messages').append("<i>name changed to " + nicknameChangeResult.nickname + "</i><br>");
    });
    
    $('#submit-form').submit(function(event){
      event.preventDefault();
      
      var formData = $(event.currentTarget).serializeJSON();
      
      getInput(chat, formData.message.text);
    });
  });
})(this);