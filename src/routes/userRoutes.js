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
    updatedUser
} = require("../controllers/userCtrl");

router.post("/register",createUser);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.get("/refresh",handleRefreshToken);
router.get("/logout", logout);
router.get("/all-users", authMiddleware, isAdmin, getallUser);
router.get("/:id", authMiddleware, getaUser);
router.delete("/:id", authMiddleware, isAdmin, deletedUser);
router.put("/edit-user", authMiddleware, updatedUser);


module.exports = router