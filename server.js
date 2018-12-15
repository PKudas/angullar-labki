var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer(function (request, response) {
    // Parsuje żądanie zawierające nazwę pliku
    var pathname = url.parse(request.url).pathname;
    // Wyświetlanie nazwy pliku, którego dotyczyło żądanie
    console.log("Request for " + pathname + " received.");
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            response.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data.toString()); // zwracanie treści wybranego pliku
        }
        response.end(); // wysyłanie odpowiedzi
    });
}).listen(5000);
