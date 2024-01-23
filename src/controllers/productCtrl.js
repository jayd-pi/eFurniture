const Product = require("../models/product");
const asyncHandler = require("../middlewares/errorHandler");
const validateMongoDbId = require("../utils/validateMongoId");

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
const updateProduct = asyncHandler(async(req, res)=> {
    const { id } = req.params;
    validateMongoDbId(id);
    try{
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.json(updateProduct);
    } catch (err) {
        throw new Error(err);
    }
});

//delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deleteProduct = await Product.findByIdAndDelete(id);
      res.json(deleteProduct);
    } catch (error) {
      throw new Error(error);
    }
  });

//get a Product
const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const findProduct = await Product.findById(id);
      res.json(findProduct);
    } catch (error) {
      throw new Error(error);
    }
  });


module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getaProduct
};
