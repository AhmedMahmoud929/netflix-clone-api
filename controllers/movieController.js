const AppError = require("../helpers/AppError");
const Movie = require("../models/Movie.model");
const catchAsync = require("../middlewares/catchAsync");

// Get all movies
const getAllMovies = catchAsync(async (req, res) => {
  try {
    // filter movies
    const filter = Object.values(req.query).length;
    const movies = await Movie.find(filter ? req.query : {});
    res.status(200).json({
      status: "success",
      movies,
    });
  } catch (error) {
    next(AppError(error, 404));
  }
});

// Get One Movie
const getMovieById = catchAsync(async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({
      status: "success",
      movie,
    });
  } catch (error) {
    next(AppError(error, 404));
  }
});

// Update a movie
const updateMovie = catchAsync(async (req, res, next) => {
  // chack if title is used
  const titleExist = await Movie.findOne({ title: req.body.title });
  // chack if title is used
  if (!titleExist) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      // send the response
      res
        .status(200)
        .json({ message: "Movie updated successfully", updatedMovie });
    } catch (err) {
      next(AppError(err, 500));
    }
  } else next(AppError("This title already used", 500));
});

// Delete a movie
const deleteMovie = catchAsync(async (req, res, next) => {
  // check the admin identity
  try {
    await Movie.findByIdAndDelete(req.params.id);
    // send the response
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    next(AppError(err, 500));
  }
});

// add new movie
const createMovie = catchAsync(async (req, res, next) => {
  const title = req.body.title;
  const movieExist = await Movie.findOne({ title: title });
  if (movieExist) next(AppError("This title is already used", 500));
  const newMovie = await Movie.create({
    title: title,
  });

  newMovie.save();
  res.status(201).json({
    status: "success",
    newMovie,
  });
});

module.exports = {
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  createMovie,
};
