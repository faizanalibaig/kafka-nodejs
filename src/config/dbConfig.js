const mongoose = require("mongoose");
require("dotenv").config();

const dbconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to Mongodb");
  } catch (error) {
    console.log("there is error connecting to Mongodb: ", error);
  }
};

module.exports = dbconnection;
