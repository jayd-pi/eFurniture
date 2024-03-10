const Product = require("../models/product");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoId");

const index = asyncHandler(async (req, res) => {
  try {
    res.render("index");
  } catch (error) {}
});
//create a product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const createProduct = await Product.create(req.body);
    res.redirect("/");
  } catch (err) {
    throw new Error(err);
  }
});

// update product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.redirect("/");
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
  } catch (error) {
    throw new Error(error);
  }
  res.redirect("/");
});

//get a Product
const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id);
    res.render("edit", {
      product: findProduct,
    });
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// get all Product
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    ///filter product
    const queryObj = { ...req.query };
    const excludeFields = ["page", "limit", "sort", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]); // delete all fields if available
    console.log(queryObj);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    const sortBy = req.query.sort
      ? req.query.sort.split(",").join(" ")
      : "-createdAt";
    query = query.sort(sortBy);

    const fields = req.query.fields
      ? req.query.fields.split(",").join(" ")
      : "-__v";
    query = query.select(fields);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (page > 1) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        throw new Error("This page does not exist");
      }
    }

    const product = await query;
    res.render("index", {
      products: product,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//addTwishlist

const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  console.log(prodId);
  try {
    const user = await User.findById(_id);
    const alreadyadded = await user.wishlist.find(
      (id) => id.toString() === prodId
    );
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getaProduct,
  getAllProduct,
  addToWishlist,
  index,
};
