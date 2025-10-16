const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
