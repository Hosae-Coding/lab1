const http = require('http');
const fs = require('fs');
const mime = require('mime-types');

let lookup = mime.lookup;

const port = 3000;

const server = http.createServer(function (req, res) {
   let path = req.url;

   if (path === '/' || path === '/home') {
      path = '/index.html';
   }

   let mime_type = lookup(path.substring(1));
   console.log(`mime ${mime_type}`);

   fs.readFile(__dirname + path, function (err, data) {
      if (err) {
         res.writeHead(404);
         console.log(`ERROR: ${err.message}`);
         res.end('404 ERROR');
      }

      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.writeHead(200, { mime_type });

      return res.end(data);
   });
});

server.listen(port, function () {
   console.log(`server running on ${port}`);
});
