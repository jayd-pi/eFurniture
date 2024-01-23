const Product = require("../models/product");
const asyncHandler = require("../middlewares/errorHandler");

//create a product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const createProduct = await Product.create(req.body);
    res.json(createProduct);
  } catch (err) {
    throw new Error(err);
  }
});

// update product

module.exports = {
  createProduct,
};
