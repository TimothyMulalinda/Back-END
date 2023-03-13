const express = require("express")
const moment = require('moment/moment');
const morgan = require('morgan');
const users = require("./users2")
const app = express()
const port = 3000;

//Catat Log
const log = (req, res, next) => {
    console.log[`${moment().format('LLLL')} - ${req.ip} - ${req.originalURL}`]
    next();
  };
  app.use(log);
  app.use(morgan("combined"));

//ROUTING
app.get("/", (req, res) => {
    res.send("hello")}) 

    //List data Users
    app.get("/users", (req, res) => {
        res.json({
              status : 'success',
              message: 'respon success',
              description: 'Exercise#03',
              Date: `${new Date().toDateString()}`,
              data : users
          })
        });
        
        //List permintaan Client
        app.get('/users/:name', (req, res) => {
            const name = req.params.name.toLowerCase(); // ignore case
            const user = users.find(u => u.name.toLowerCase() === name);
            if (!user) {
              res.status(404).json({ message: 'Data User tidak di temukan...' });
            } else {
              res.json(user);
            }
          });

          //Routing 404
          const notFound = (req, res, next) => {
            res.json({
              status: "Error",
              message: "eitss nda ada resources"
            });
          };
          app.use(notFound);
          
          //Penanganan Error
          app.use((err, req, res, next) => 
                res.json({
                    status: "error",
                    message: `terjadi kesalahan pada server ${err}`,
            })
          );

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)})

