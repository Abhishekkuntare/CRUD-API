const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//1. call the express
const app = express();

//2.use the express as json
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json);

//3.Coonecting to a mongoDB
mongoose
  .connect("mongodb://localhost:27017/sample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connecting to the mongo db");
  })
  .catch((err) => {
    console.log(err);
  });
