const express = require('express')
const members = require('./members');
const ambilData = require('./users')

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

  app.get("/post/:id", (req, res) => {
    res.send("TESTING" + req.params.id)
  });

  app.get("/foods", (req, res) => {
    const page = req.query.page ? req.query.page : 1
    res.write('Foods page : '+page+'\n')
    if(req.query.sort) res.write('Sort by: '+req.query.sort)
    res.end()
  });
  
app.get("/users", async (req, res) => {
    res.writeHead(200, {"Content" : "application/json"});
    res.end(JSON.stringify(await ambilData()));
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)})