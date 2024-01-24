const express = require("express");
const router = express.Router();
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware")
const {
    createUser
} = require("../controllers/userCtrl");

router.post("/register",createUser);
// router.post("/login", loginUserCtrl);
// router.post("/admin-login", loginAdmin);

module.exports = router