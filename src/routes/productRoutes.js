const express = require("express");
const router = express.Router();

const {
    createProduct,
    updateProduct
} = require("../controllers/productCtrl")

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
module.exports = router