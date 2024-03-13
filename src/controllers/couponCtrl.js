const Coupon = require("../models/couponModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoId");
const validateCouponData = require("../utils/validateCoupon");
const index = asyncHandler(async (req, res) => {
  try {
    res.render("index");
  } catch (error) {}
});

const createCoupon = asyncHandler(async (req, res) => {
  try {
    validateCouponData(req.body);
    const createdCoupon = await Coupon.create(req.body);
    res.redirect("/");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update coupon
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    validateCouponData(req.body);
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.redirect("/");
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
    // res.json(deleteCoupon);
    res.redirect("/");
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
    // res.json(findCoupon);
    res.render("edit", {
      coupon: findCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//get all coupon
const getAllCoupon = asyncHandler(async (req, res) => {
  try {
    const findCoupon = await Coupon.find();
    res.render("index", {
      coupons: findCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getaCoupon,
  getAllCoupon,
  index,
};
