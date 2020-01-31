const http = require('http');

const server = http.createServer((req, res) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  const ua = req.headers['user-agent'];
  const contentType = req.headers['content-type'];
  
  res.writeHead(200, {
    'Content-Type': contentType || 'text/html'
  });

  if (contentType === 'application/json') {
    res.write(JSON.stringify({
      ip,
      ua
    }));
  } else {
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
        margin: 12px;
        text-align: center;
        font-size: 16px;
      }
      .code{
        display: block;
        padding: 5px;
        background: #f1f8ff;
        border: 1px solid #d1d5da;
        font-weight: bold;
      }
    </style>
</head>

<body>
  <div class="app">
    Current IP: <span class="code">${ip}</span><br />
    UA: <span class="code">${ua}</span>
  </div>
</body>
</html>
`);
  }

  res.end();
});
server.listen(8888, '0.0.0.0');