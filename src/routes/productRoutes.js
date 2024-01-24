const express = require("express");
const { authMiddleware, isAdmin} = require('../middlewares/authMiddleware')
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getaProduct,
    getAllProduct
} = require("../controllers/productCtrl")
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createProduct);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
router.get('/:id', getaProduct);
router.get('/', getAllProduct);

module.exports = router