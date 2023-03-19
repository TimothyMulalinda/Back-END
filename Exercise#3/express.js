const express = require('express')
const members = require('./members');
const ambilData = require('./users');

const app = express();
const port = 3500;

app.get("/", (req, res) => {
  res.send("This is the homepage")
}); 

app.get("/about", (req, res) => {
  res.json({
        status : 'success',
        message: 'respon success',
        description: 'Exercise#03',
        Date: `${new Date().toDateString()}`,
        data : members
    })
  });
  
app.get("/users", async (req, res) => {
    res.writeHead(200, {"Content" : "application/json"});
    res.end(JSON.stringify(await ambilData()));
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)})