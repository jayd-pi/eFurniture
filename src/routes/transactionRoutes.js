const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { topUp, viewTransaction } = require("../controllers/transactionCtrl");
const router = express.Router();

router.post(topUp);
router.get("/:id", authMiddleware, viewTransaction);

module.exports = router;
