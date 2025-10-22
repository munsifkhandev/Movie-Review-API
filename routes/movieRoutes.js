const express = require("express");
const reviewRouter = require("./reviewRoutes");
const {
  addMovie,
  getAllMovies,
  getMovieById,
} = require("../controllers/movieController");
const router = express.Router();

router.post("/create", addMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovieById);

router.use("/:movieId/reviews", reviewRouter);

module.exports = router;
