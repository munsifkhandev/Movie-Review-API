const Movie = require("../models/Movie");
const Review = require("../models/Review");

const addReview = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { comment, rating } = req.body;
    const userId = req.user.id;
    const movieExists = await Movie.findById(movieId);
    if (!movieExists) {
      return res.status(404).json({
        success: false,
        message: "Movie Does not Exist..",
      });
    }
    const newReview = new Review({
      comment,
      rating,
      user: userId,
      movie: movieId,
    });
    const savedReview = await newReview.save();

    const allReviewsForMovie = await Review.find({ movie: movieId });
    let totalRating = 0;
    allReviewsForMovie.forEach((review) => {
      totalRating += review.rating;
    });
    const averageRating =
      allReviewsForMovie.length > 0
        ? totalRating / allReviewsForMovie.length
        : 0;
    await Movie.findByIdAndUpdate(movieId, { averageRating: averageRating });
    return res.status(201).json({
      success: true,
      data: savedReview,
      message: "Successfullyy Added Review..",
    });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add review.",
    });
  }
};

const getReviewsForMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movie: movieId });
    return res.status(200).json({
      success: true,
      data: reviews,
      message: "Here are your Reviews",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error Receiving Reviews..",
    });
  }
};

const updateMyReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { comment, rating } = req.body;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found." });
    }

    if (review.user.toString() !== userId) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to update this review.",
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { comment, rating },
      { new: true, runValidators: true }
    );

    const movieId = updatedReview.movie;
    const allReviewsForMovie = await Review.find({ movie: movieId });
    const totalRating = allReviewsForMovie.reduce(
      (sum, rev) => sum + rev.rating,
      0
    );
    const averageRating =
      allReviewsForMovie.length > 0
        ? totalRating / allReviewsForMovie.length
        : 0;
    await Movie.findByIdAndUpdate(movieId, { averageRating: averageRating });

    res.status(200).json({
      success: true,
      data: updatedReview,
      message: "Review updated successfully.",
    });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  addReview,
  getReviewsForMovie,
  updateMyReview,
};
