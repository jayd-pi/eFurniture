const mongoose = require("mongoose");

const dotenv = require('dotenv');
dotenv.config();

const dbConnect = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      
    });
    console.log("connect successfully");
  } catch (error) {
    console.log("Failed", error);
  }
};

module.exports = dbConnect;
