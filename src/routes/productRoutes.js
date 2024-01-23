const express = require("express");
const router = express.Router();

const {
    createProduct,
    updateProduct,
    deleteProduct,
    getaProduct
} = require("../controllers/productCtrl")

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', get)
module.exports = router