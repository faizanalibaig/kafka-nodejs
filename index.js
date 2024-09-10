const express = require("express");
const mongoose = require("mongoose");
const dbconnection = require("./src/config/dbConfig");
const LedgerUser = require("./src/models/ledgeruser");
const app = express();

require("dotenv").config();
const port = process.env.PORT;

dbconnection();

app.get("/", async (req, res) => {
  res.send("404");
});

app.listen(port || 8080, () => {
  console.log(`running on port: ${port}`);
});
