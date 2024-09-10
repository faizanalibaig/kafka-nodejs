const express = require("express");
const mongoose = require("mongoose");
const dbconnection = require("./src/config/dbConfig");
const app = express();

require("dotenv").config();
const port = process.env.PORT;

dbconnection();

app.get("/", (req, res) => {
  res.send("404");
});

app.listen(port || 8080, () => {
  console.log(`running on port: ${port}`);
});
