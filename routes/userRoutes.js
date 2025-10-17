const express = require("express");
const {
  registerUser,
  loginUser,
  getMyProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMyProfile);
module.exports = router;
