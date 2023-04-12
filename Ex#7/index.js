const express = require("express")
const app = express()
const client = require("./mongodb")
const port = 3000;

app.get('/', (req, res) => {
    res.send('yoo guys')
});
    
app.get("/users", async (req, res) => {
    const db = client.db("latihan");
    const users = await db.collection("users").find().toArray();
    res.json(users);
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});




//CONNECT DB
// const MongoClient = require("mongodb").MongoClient

// const connectionString = 'mongodb://127.0.0.1:27017';


// MongoClient.connect(connectionString)
// .then(async (client) => {
//     console.log("server database connnect");
//     const db = client.db("latihan");

//     const quotes = await db.collection("users").find().toArray();
//     console.log(quotes)
// })

// .catch((error) => console.error(error))
