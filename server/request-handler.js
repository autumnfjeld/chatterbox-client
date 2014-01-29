/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var _messages = [];

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

var url = require('url'),
    path = require('path'),
    fs = require('fs'),
    static = require('node-static');

var headers = {
  //"Content-Type": "json/application",
  "Content-Type": "text/plain",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var statusCodes = {
  found : 200,
  created: 201,
  notFound: 404
};

var sendResponse = function(response, status, headers, data){
  response.writeHead(status, headers);
  response.end(JSON.stringify(data));
};

var get = function(request, response){
  if (request.url === '/messages') {
    sendResponse(response, statusCodes.found, headers, _messages);
  }else if (request.url === '/') {
    sendFiles(request, response, "/client/index.html");
  }else{
    sendFiles(request, response, "/client"+request.url);
  }

};


var sendFiles = function(request, response, resource){
  var filename = path.join (process.cwd(), resource);

  fs.readFile(filename, function(err, html){
    if (err) {

    }else{
      response.writeHead(statusCodes.found, {'Content-Type':'text'});
      response.write(html);
      response.end();
    }
  });
};

var post = function(request, response){
  var dataString = '';
  request.on('data', function(chunk) {
    dataString += chunk;
  });

  request.on('end', function() {
    _messages.push(dataString);
    sendResponse(response, statusCodes.created, headers, _messages.length);
  });
};

var options = function(request, response){
  sendResponse(response, statusCodes.found, headers);
};


var methods = {
  'GET': get,
  'POST': post,
  'OPTIONS': options
};

exports.handleRequest = function(request, response) {
  var method = methods[request.method];

  if (method) {
    method(request, response);
  }else{
    console.log('not found');
    sendResponse(response, statusCodes.notFound, headers);
  }
};


  // var filename = path.join(process.cwd(), request.url, resource);

  // path.exists(filename, function(result) {
  //     if(!result) {
  //       console.log("not exists: " + filename);
  //       response.writeHead(200, {'Content-Type': 'text/plain'});
  //       response.write('404 Not Found\n');
  //       response.end();
  //     }

  //     var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
  //     response.writeHead(200, {'Content-Type':mimeType});
  //     var fileStream = fs.createReadStream(filename);
  //     fileStream.pipe(response);
  //     response.end();
  // });