const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const USER_MODEL = require("./API/Models/userModel");
const Routes = require("./API/Routes/Routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/' , Routes)

const mongooseURL =
  "mongodb+srv://snaakabha24:snaa207894155@cluster0.xvvubgq.mongodb.net/todo-test";
mongoose.connect(mongooseURL);


mongoose.connection.on("connected", () => {
  console.log("mongo connected");
});

app.post("/MyPhone", (req, res) => {
  const { Number } = req.body;
  if (!Number) {
    res.status(404).json({
      error: true,
      errormessage: "the number is required!",
    });
    return;
  }
  res.status(200).json({
    fullName: Number,
  });
});

app.post("/whatMyName", (req, res) => {
  const { name, lastName } = req.body;
  if (!name && !lastName) {
    res.status(404).json({
      error: true,
      errormessage: "name and last name  is required!",
    });
    return;
  }
  res.status(200).json({
    fullName: name + " " + lastName,
  });
});


 

 
  
  


module.exports = app;
