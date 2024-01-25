const mongoose = require("mongoose");
const { isValidImageSize } = require("../utils/validators");

const productSchema = new mongoose.Schema({
    productName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 3000,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: String,
      // default: [],
      validate: {
        validator: isValidImageSize,
        message: "Image size must be less than 10MB.",
      },
    },
  });

module.exports = mongoose.model("Product", productSchema);
