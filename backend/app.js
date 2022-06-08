const express = require("express");

// create express app and return an express app
const app = express();

app.use("/api/duties", (req, res, next) => {
  const duties = [
    { id: "ff1f121f2", name: "Data from the server" },
    { id: "41241d1d", name: "Data from the server2" },
  ];
  res.status(200).json({
    message: "Duties fetched!",
    duties: duties,
  });
});

// exports the entire app and all middlewares
module.exports = app;
