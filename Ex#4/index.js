// Express JS

const express = require("express")
const app = express()
const port = 3000;

app.get("/", (req, res) => {
    res.send("hello")}) //tambahan ini

app.get("/test", (req, res) => {
        res.send("Holaaa")}) 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)})

