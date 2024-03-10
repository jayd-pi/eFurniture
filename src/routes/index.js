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
const router = express.Router();

router.get("/login", loginForm);
router.post("/login", loginAdmin);

router.get("/", authMiddleware, isAdmin, getAllProduct);
router.post("/", authMiddleware, isAdmin, createProduct);

router.get("/logout", authMiddleware, isAdmin, logout);

router.get("/delete/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/edit/:id", authMiddleware, isAdmin, getaProduct);
router.post("/edit/:id", authMiddleware, isAdmin, updateProduct);
module.exports = router;
