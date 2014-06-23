var path = require('path');
var mime = require('mime');
var fs = require('fs');

var serveFile = function(res, absPath){
	console.log("serving file at ", absPath);
  
  fs.readFile(absPath, function (err, data) {
    if (err) {
    	console.log("ERROR LOGGED: ", err);
			serveError(res, 404); 
    } else {
      res.writeHead(200, {'Content-Type': mime.lookup(path.basename(absPath))});
      res.end(data);
    }
  });
}

var serveError = function(response, errorCode){
  var message;
  if (errorCode === 404){
    //TODO: Serve an actual HTML page for these.
    message = 'Error 404: resource not found.';
  } else {
    message = 'Error: there was a problem.';    
  }
  response.writeHead(errorCode, {"Content-Type": "text/plain"});
  response.write(message);
	response.end();
}

var start = function(req, res) {
  var url = req.url;
  
  if (url === "/") {
    serveFile(res, "public/index.html");
  } else {
    if (url[0] === "/") { url = url.slice(1); }
    serveFile(res, url);
  }
};

module.exports.start = start;