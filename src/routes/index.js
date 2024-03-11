const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getaProduct,
  getAllProduct,
  addToWishlist,
  index,
} = require("../controllers/productCtrl");
const {
  loginForm,
  loginAdmin,
  loginUserCtrl,
  logout,
} = require("../controllers/userCtrl");
const { getAllCoupon, createCoupon, deleteCoupon, getaCoupon, updateCoupon } = require("../controllers/couponCtrl");
const router = express.Router();

router.get("/login", loginForm);
router.post("/login", loginAdmin);

router.get("/", authMiddleware, isAdmin, getAllCoupon);
router.post("/", authMiddleware, isAdmin, createCoupon);

router.get("/logout", authMiddleware, isAdmin, logout);

router.get("/delete/:id", authMiddleware, isAdmin, deleteCoupon);
router.get("/edit/:id", authMiddleware, isAdmin, getaCoupon);
router.post("/edit/:id", authMiddleware, isAdmin, updateCoupon);
module.exports = router;
