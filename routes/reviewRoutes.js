const express = require("express");
const {
  addReview,
  getReviewsForMovie,
} = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router({ mergeParams: true });

router.post("/", authMiddleware, addReview);
router.get("/", getReviewsForMovie);

module.exports = router;
