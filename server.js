//import express
const express = require("express");
//instance creation
const app = express();
//middelware json 
app.use(express.json())
//dotenv import
require("dotenv").config();
//db connection
const db = require("./Config/connectdb");
db();
//creation route global
app.use("/api/user",require("./Routes/user"))
//port creation
const port = process.env.PORT;
//server creation
app.listen(port, (err) =>
  err ? console.log(err) : console.log(`the server is running on ${port}`)
);
