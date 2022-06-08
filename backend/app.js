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
  // set headers to avoid CORS issue (different server ports)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  // continue to the next middleware
  next();
});

app.post("/api/duties", (req, res, next) => {
  const duty = new Duty({
    name: req.body.name,
  });
  // inserts a new entry with that data and auto generated id into the database
  duty.save();
  res.status(201).json({
    message: "Duty added correctly!",
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

// exports the entire app and all middlewares
module.exports = app;
