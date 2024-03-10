const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies["token"]; // Truy cập token từ cookie
  if (!token) {
    return res.redirect("/login");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ error: "Unauthorized: User not found" });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({
        error: "Unauthorized: Token expired or invalid. Please login again.",
      });
    }
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  if (!req.user) {
    return res.redirect("/login");
  }
  const isAdminUser = await User.findOne({ email });
  if (isAdminUser.isAdmin === false) {
    res.redirect("/login");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
