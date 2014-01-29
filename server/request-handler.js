/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var _messages = [];

var url = require('url'),
    path = require('path'),
    fs = require('fs');

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
  console.log('type:', response.method, 'checkdata',data);
  response.end(JSON.stringify(data));
};

var get = function(request, response){
  sendResponse(response, statusCodes.found, headers, _messages);
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
    console.log("in the last else!");
    sendResponse(response, statusCodes.notFound, header);
  }
};

  // if(request.url === '/' && request.method === 'GET') {
  //   var filename = path.join(process.cwd(), request.url);
  //   console.log(filename );

  //   // path.exists(filename, function(exists) {
  //   //     if(!exists) {
  //   //         console.log("not exists: " + filename);
  //   //         res.writeHead(200, {'Content-Type': 'text/plain'});
  //   //         res.write('404 Not Found\n');
  //   //         res.end();
  //   //     }
  //   //     var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
  //   //     res.writeHead(200, mimeType);

  //   //     var fileStream = fs.createReadStream(filename);
  //   //     fileStream.pipe(res);
  //   // });

  //   console.log('serving files');
  //   sendResponse(response, statusCodes.found, headers);

  // }
