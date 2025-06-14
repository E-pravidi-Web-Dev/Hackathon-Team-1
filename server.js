const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 8080;
http.createServer((req, res) => {
  fs.readFile('index.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
}).listen(port, () => {
  console.log('Server running on port', port);
});
