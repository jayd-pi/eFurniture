const express = require("express");
const router = express.Router();
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware")
const {
    createUser
} = require("../controllers/userCtrl");

router.post("/register",createUser);

module.exports = router