const express = require("express");
const router = express.Router();

const {
    createProduct,
    updateProduct
} = require("../controllers/productCtrl")

router.post('/', createProduct);
router.put('/:id', updateProduct);
module.exports = router