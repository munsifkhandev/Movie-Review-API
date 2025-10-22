const express = require("express");
const {
  addReview,
  getReviewsForMovie,
  updateMyReview,
  deleteMyReview
} = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router({ mergeParams: true });

router.post("/", authMiddleware, addReview);
router.get("/", getReviewsForMovie);
router.put("/:reviewId", authMiddleware, updateMyReview);
router.delete("/:reviewId", authMiddleware, deleteMyReview);
module.exports = router;
