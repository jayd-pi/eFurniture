const mongoose = require("mongoose");

const dotenv = require('dotenv');
dotenv.config();

const dbConnect = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URL);
    if (con) console.log("connect successfully");
  } catch (error) {
    console.log("Failed", error);
  }
};

module.exports = dbConnect;
