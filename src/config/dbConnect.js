const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connect successfully");
  } catch (error) {
    console.log("Failed", error);
  }
};

module.exports = dbConnect;
