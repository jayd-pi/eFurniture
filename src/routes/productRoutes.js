const express = require("express");
const router = express.Router();
const { authMidleware, isAdmin} = require('../middlewares/authMiddleware')
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getaProduct,
    getAllProduct
} = require("../controllers/productCtrl")

router.post('/',authMidleware, isAdmin, createProduct);
router.put('/:id', authMidleware, isAdmin, updateProduct);
router.delete('/:id', authMidleware, isAdmin, deleteProduct);
router.get('/:id', getaProduct);
router.get('/', getAllProduct);
module.exports = router