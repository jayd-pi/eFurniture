const Coupon = require("../models/couponModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoId");

//create a coupon
const createCoupon = asyncHandler(async (req, res) => {
  try {
    const createCoupon = await Coupon.create(req.body);
    res.json(createCoupon);
  } catch (err) {
    throw new Error(err);
  }
});

// update coupon
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCoupon);
  } catch (err) {
    throw new Error(err);
  }
});

//delete coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCoupon = await Coupon.findByIdAndDelete(id);
    res.json(deleteCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

//get a Coupon
const getaCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findCoupon = await Coupon.findById(id);
    res.json(findCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

//get all coupon
const getAllCoupon = asyncHandler(async (req, res) => {
    try {
        const findCoupon = await Coupon.find();
        res.json(findCoupon);
      } catch (error) {
        throw new Error(error);
      } 
} )


module.exports = {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getaCoupon,
  getAllCoupon,
 
};
