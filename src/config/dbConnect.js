const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("connect successfully");
  } catch (error) {
    console.log("Failed", error);
  }
};

module.exports = dbConnect;
