const express = require("express");
const reviewRouter = require("./reviewRoutes");
const {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");
const router = express.Router();

router.post("/create", addMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

router.use("/:movieId/reviews", reviewRouter);

module.exports = router;
