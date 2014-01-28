/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var _storage = [];

exports.handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  
  var statusCode = 200;

  // Post
  if (request.url === '/messages' && request.method === "POST"){
    var dataString = '';
    request.on('data', function(chunk) {
      dataString += chunk;
    });

    request.on('end', function() {
      _storage.push(dataString);
      console.log(_storage);
      response.writeHead(statusCode, defaultCorsHeaders);

      response.end();
    });
  }else if (request.url === '/messages' && request.method === "GET"){
      console.log('get messages!!!');
      response.writeHead(statusCode, defaultCorsHeaders);
      response.write(JSON.stringify(_storage));
      response.end();
  }
  else{
    response.writeHead(statusCode, defaultCorsHeaders);
    console.log("in the last else!");
    response.end("Hello, World!");
  }


};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "Content-Type": "text/plain",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
