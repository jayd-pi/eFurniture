const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { createReviews, getReviews } = require("../controllers/reviewsCtrl");
const router = express.Router();

router.post("/:idProduct", authMiddleware, createReviews);
router.get("/:idProduct", getReviews);

module.exports = router;
