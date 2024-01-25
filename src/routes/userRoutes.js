const express = require("express");
const router = express.Router();
const {authMiddleware, isAdmin} = require("../middlewares/authMiddleware")
const {
    createUser,
    loginUserCtrl,
    loginAdmin,
    handleRefreshToken,
    logout,
    getallUser,
    getaUser,
    deletedUser,
    updatedUser,
    blockUser,
    unblockUser,
    addToCart,
    getUserCart,
    emptyCart,
    getWishList,
    applyCoupon,
    createOrder,
    deleteOrder,
    getOrders
} = require("../controllers/userCtrl");

router.post("/register",createUser);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.get("/refresh",handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishList);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.get("/:id", authMiddleware, getaUser);
router.delete("/:id", authMiddleware, isAdmin, deletedUser);
router.get("/all-users", authMiddleware, isAdmin, getallUser);

router.put("/edit-user", authMiddleware, updatedUser);
router.post("/cart", authMiddleware, addToCart);
router.get("/cart", authMiddleware, getUserCart);
router.get("/refresh",handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishList);
router.post("/cart/applyCoupon",authMiddleware, applyCoupon );
router.post("/cart/create-order", authMiddleware, createOrder);
router.put("/:id", authMiddleware, deleteOrder);
router.get("/get-orders", authMiddleware, getOrders);

router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);




module.exports = router