const express = require("express");
const { authMiddleware, isAdmin} = require('../middlewares/authMiddleware')
const {
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getaCoupon,
    getAllCoupon,
   
} = require("../controllers/couponCtrl")
const router = express.Router();

router.post('/',authMiddleware, isAdmin, createCoupon);
router.put('/:id', authMiddleware, isAdmin, updateCoupon);
router.delete('/:id', authMiddleware, isAdmin, deleteCoupon);
router.get('/:id', getaCoupon);
router.get('/', getAllCoupon);

module.exports = router