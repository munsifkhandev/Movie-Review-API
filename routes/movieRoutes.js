const express = require("express");
const { addMovie, getAllMovies } = require("../controllers/movieController");
const router = express.Router();

router.post("/create", addMovie);
router.get("/", getAllMovies);

module.exports = router;
