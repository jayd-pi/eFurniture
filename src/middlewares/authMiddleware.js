const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized: No valid token provided" });
  } else {
    const token = authorizationHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ error: "Unauthorized: User not found" });
      }
      req.user = user;
      next();
    } catch (err) {
      return res
        .status(401)
        .json({
          error: "Unauthorized: Token expired or invalid. Please login again.",
        });
    }
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const isAdminUser = await User.findOne({email})
  if (isAdminUser.isAdmin) {
    throw new Error("You are not an Admin")
  } else{
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
