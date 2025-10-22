const Movie = require("../models/Movie");

const addMovie = async (req, res) => {
  try {
    const { title, genre, releaseYear } = req.body;
    const movieExists = await Movie.findOne({ title });

    if (movieExists) {
      return res.status(400).json({
        success: false,
        message: "Movie with this Title Alreadyy Exists..",
      });
    }
    const newMovie = new Movie({
      title,
      genre,
      releaseYear,
    });
    const savedMovie = await newMovie.save();
    return res.status(201).json({
      success: true,
      data: savedMovie,
      message: "New Movie Added Successfullyyy...",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error Adding New Movie...",
    });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    return res.status(200).json({
      success: true,
      data: movies,
      message: "Here are your All movies...",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error Occurred while displaying all movies.",
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie Does not Exists.." });
    }
    return res
      .status(200)
      .json({ success: true, data: movie, message: "Here is your Movie.." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error getting movie by ID...",
    });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
};
