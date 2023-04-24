const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./Database/connection");
require("dotenv").config();
const app = express();

connectDb();

const port = process.env.PORT || 5000

app.use(express.json());

app.get('/Homepage',(req, res)=>{
    res.send("Hello user");
})

app.listen(port,()=>{
    console.log(`Port running on ${port}`);
})














// console.log("Hello world");