// Simple static server with MIME based on https://gist.github.com/906395
// Definitely not for production use. 
var path = require('path');
var http = require("http");
var fs = require('fs');
var url = require("url");

try{
  var mime = require('mime');
} catch(error) {
  console.log("**** UNABLE TO START. Please install the MIME library with\n\n \tnpm install mime\n\n and restart.");
  return;
}
 
var directory = ".";
var port = 8888;
 
var server = http.createServer(function (request, response) {
 
    var uri = url.parse(request.url).pathname;
    var filename = path.join(directory, uri);
 
    fs.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
            return;
        }
        if (fs.statSync(filename).isDirectory()) {          
            if (fs.existsSync(filename + 'index.html')) {
              filename += 'index.html';
            }else{
                response.writeHead(301,
                  {Location: 'app/dist/index.html'}
                );
                response.end();
                return;
            }      
        }
 
        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.write(err + "\n");
                response.end();
                return;
            }
 
            var type = mime.lookup(filename);
            response.writeHead(200, {
                "Content-Type": type
            });
            console.log("Serving " + filename);
            response.write(file, "binary");
            response.end();
        });
    });
});


server.listen(port);
console.log("Listening on port " + port + ". Press CTRL+C to stop.");