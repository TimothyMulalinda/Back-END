const express = require("express")
const fs = require("fs");
const bodyParser = require("body-parser")
const multer = require("multer")
const morgan = require("morgan")
const path = require("path");
const cors = require("cors");


const app = express();
const members = require("./users")


const upload = multer({ dest: "public/" });

//cors
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//middleware morgan
app.use(morgan("combined"));

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//file static pada folder public
app.use(express.static(path.join(__dirname, "public")));

    //List data Users
    app.get("/users", (req, res) => {
        res.json({
              status : 'success',
              Date: `${new Date().toDateString()}`,
              data : members

          })
        });
        
        //List permintaan Client
        app.get('/users/:name', (req, res) => {
            const name = req.params.name.toLowerCase(); // ignore case
            const user = members.find(u => u.name.toLowerCase() === name);
            if (!user) {
              res.status(404).json({ message: 'Data User tidak di temukan...' });
            } else {
              res.json(user);
            }
          });
        
        //endpoint untuk record baru - bodyparser
        app.post("/users", (req, res) => {
          const { id, name } = req.body;
          const newUser = { id, name };
          members.push(newUser);
          res.json(`Berhasil menambahkan username: ${name}, dan id: ${id}`);
        });

        //endpoint for upload a file
        app.post("/upload", upload.single("file"), (req, res) => {
          const file = req.file;
          if (file) {
            const target = path.join(__dirname, "/public", file.originalname);
            console.log(target);
            fs.renameSync(file.path, target);
            res.send("file berhasil di-upload");
          } else {
            res.send("file gagal di-upload");
          }
        });

        //endpoint update user name
        app.put("/users/:name", (req, res) => {
          if (!req.body.name) {
            res.json({ message: "error, tidak memasukkan data pada request body" });
          } else {
            members.forEach((e) => {
              if (req.params.name.toLocaleLowerCase() === e.name.toLocaleLowerCase()) {
                e.name = req.body.name;
                res.json(e);
              }
            });
            res.json({ message: "tidak menemukan nama yang sesuai" });
          }
        });

        //endpoint for hapus data dgn nama
        app.delete("/users/:name", (req, res) => {
          members.forEach((e, i) => {
            if (req.params.name.toLocaleLowerCase() === e.name.toLocaleLowerCase()) {
              members.splice(i, 1);
              res.json(members);
            }
          });
          res.json({ message: "tidak menemukan nama yang sesuai" });
        });
        
          //Routing 404
          const notFound = (req, res, next) => {
            res.json({
              status: "Error",
              message: "resources tidak ditemukan"
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

const port = 3000;
app.listen(port, () => {console.log(`Server running at http://localhost:${port}`)})

