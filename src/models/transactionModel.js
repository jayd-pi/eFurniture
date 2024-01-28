const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true,
    maxlength: 100,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 3000,
  },
  remain: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
