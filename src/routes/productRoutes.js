const express = require("express");
const router = express.Router();

const {
    createProduct,
    updateProduct,
    deleteProduct,
    getaProduct,
    getAllProduct
} = require("../controllers/productCtrl")

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getaProduct);
router.get('/', getAllProduct);
module.exports = router