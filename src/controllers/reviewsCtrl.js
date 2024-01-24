const Review = require("../models/reviewsModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoId");
//create a reviews
const createReviews = asyncHandler(async (req, res) => {
  try {
    const { idProduct } = req.params;
    const reviewData = { ...req.body, productId: idProduct };
    const createdReview = await Review.create(reviewData);
    res.json(createdReview);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error when post review for this product." });
  }
});

//get a Review for product
const getReviews = asyncHandler(async (req, res) => {
  const { idProduct } = req.params;

  try {
    const reviews = await Review.find({ productId: idProduct });
    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this product." });
    }
    res.json(reviews);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error when get review for this product." });
  }
});

module.exports = {
  createReviews,
  getReviews,
};
