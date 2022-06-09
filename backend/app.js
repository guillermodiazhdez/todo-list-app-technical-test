const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Duty = require("./models/duty");

// create express app and return an express app
const app = express();

mongoose
  .connect(
    "mongodb+srv://Admin:FFb1WCeI7lFZL0QV@cluster0.zjavk.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// returns valid express middleware for parsing JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/duties", (req, res, next) => {
  const duty = new Duty({
    name: req.body.name,
  });
  // inserts a new entry with that data and auto generated id into the database
  duty.save().then((addedDuty) => {
    res.status(201).json({
      message: "Duty added correctly!",
      dutyId: addedDuty._id,
    });
  });
});

app.put("/api/duties/:id", (req, res, next) => {
  const duty = new Duty({
    _id: req.body.id,
    name: req.body.name,
  });
  Duty.updateOne({ _id: req.params.id }, duty).then((result) => {
    console.log(result);
    res.status(200).json({ message: "success" });
  });
});

app.get("/api/duties", (req, res, next) => {
  Duty.find().then((documents) => {
    res.status(200).json({
      message: "Duties fetched!",
      duties: documents,
    });
  });
});

// dynamic id to delete each duty
app.delete("/api/duties/:id", (req, res, next) => {
  Duty.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Post deleted",
    });
  });
});

// exports the entire app and all middlewares
module.exports = app;
