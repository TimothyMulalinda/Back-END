const express = require('express');
const moment = require('moment/moment');
const morgan = require('morgan');
const members = require('./members');
const ambilData = require('./users');
const cors = require('cors')

const app = express();
const port = 3500;

//Middleware for penanganan log
const log = (req, res, next) => {
  console.log[`${moment().format('LLLL')} - ${req.ip} - ${req.originalURL}`]
  next();
};
app.use(log);
app.use(morgan("combined"));

//Definisi Routing 
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

  //PARAMS
  app.get("/post/:id", (req, res) => {
    res.send("TESTING" + req.params.id)
  });

  //QUERY STRING
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

  //Middleware menangani routing 404
  // app.use((req, res, next)=> {
  //   res.json({
  //     status: "Error bosqu",
  //     message: "eitss nda ada resources"
  //   });
  // });

  // app.use((req,res,next) => {
  //   res.status(404).send('nda ada');
  // })

  const notFound = (req, res, next) => {
    res.json({
      status: "Error bosqu",
      message: "eitss nda ada resources"
    });
  };
  app.use(notFound);

  //Middleware untuk Error Handling
  app.use((err, req, res, next) => 
    res.json({
      status: "error",
      message: `terjadi kesalahan pada server ${err}`,
    })
  );

  //Middleware CORS
  //enable cors middleware
  app.use(cors('https://codepen.io')); //mengizinkan origin(api apa saja yang kita izinkan)

  //untuk mengatasi CORS Policy
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');//methodsnya apa saja yang diizinkan untuk masuk
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');//berikan izin untuk header
    next();
  })

  // API endpoints
  app.get('/api/users', (req, res) => {
  // Handle GET request for /api/users endpoint
  console.log("testing get");
  });

  app.post('/api/login', (req, res) => {
  // Handle POST request for /api/login endpoint
  console.log("testing post");
  });


  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)})

  //Middleware Menangani Request Body
  //Middleware Menangani Statis File
  //Middleware Menangani FIle Upload
  //Middleware Menangani CORS (Cross Origin resource sharing) *


