const http = require('http');

const server = http.createServer((req, res) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  
  const ua = req.headers['user-agent'];
  
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(`
<!doctype html>
<html>
<head>
    <title>IP</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <style type="text/css">
      .app{
        margin: 30px;
        text-align: center;
        font-size: 16px;
      }
    </style>
</head>

<body>
  <div class="app">
    Current IP: <span>${ip}</span><br />
    UA: <span>${ua}</span>
  </div>
</body>
</html>
`);
  res.end();
});
server.listen(8888, '0.0.0.0');