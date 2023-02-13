const http = require('http');
const members = require('./members');
const ambilData = require('./users');

const server = http.createServer(async (req, res) => {
const path = req.url;

  if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the home page');
    res.end();

  } else if (path === '/about') {
    const data = {
      status: 'success',
      message: 'response success',
      description: 'Exercise #03',
      date: new Date().toISOString(),
      data: members
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));

  } else if (path === '/users') {
    const users = await ambilData()
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  }
});

const hostname = "127.0.0.1";
const port = 3000;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
