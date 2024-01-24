const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  idProduct: {
    type: String,
    required: true,
    maxlength: 100,
  },
  content: {
    type: String,
    maxlength: 3000,
  },
  idUser: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
