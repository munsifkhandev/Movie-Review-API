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

module.exports = {
  addReview,
  getReviewsForMovie,
};
