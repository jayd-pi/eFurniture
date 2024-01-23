const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongoId");
const { generateRefreshToken } = require("../config/generateRefreshToken");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//Register account

const createUser = asyncHandler(async (req, res) => {
    try {
      const { email } = req.body;
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        res.status(400).json({ error: "User with this email already exists" });
      }
      const newUser = new User(req.body);
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = {
    createUser
}