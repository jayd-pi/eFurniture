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
    getOrders,
    updatePassword
} = require("../controllers/userCtrl");

router.post("/register",createUser);
router.post("/login", loginUserCtrl);
router.put("/password", authMiddleware, updatePassword);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, addToCart);
router.get("/cart", authMiddleware, getUserCart);
router.get("/refresh",handleRefreshToken);
router.post("/logout", logout);
router.get("/wishlist", authMiddleware, getWishList);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.get("/:id", authMiddleware, getaUser);
router.delete("/:id", authMiddleware, isAdmin, deletedUser);
router.get("/all-users", authMiddleware, isAdmin, getallUser);

router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.get("/orders", authMiddleware, getOrders);





module.exports = router