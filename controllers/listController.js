const AppError = require("../helpers/AppError");
const List = require("../models/List.model");
const catchAsync = require("../middlewares/catchAsync");

// Create a new list
const createList = catchAsync(async (req, res, next) => {
  try {
    // check if title is used
    const titleUsed = await List.findOne({ title: req.body.title });
    if (titleUsed) next(AppError("This title is already used", 500));
    else {
      const newList = await new List(req.body).save();
      // send the response
      res.status(200).json({
        status: "User added successfully",
        newList,
      });
    }
  } catch (err) {
    next(AppError(err, 500));
  }
});

// Get all movies
const getAllMovies = catchAsync(async (req, res, next) => {
  try {
    // filter movies
    const filter = Object.values(req.query).length;
    const lists = await List.find(filter ? req.query : {});
    res.status(200).json({ lists });
  } catch (err) {
    next(AppError(err, 404));
  }
});

// Delete an exist list
const deleteMovie = catchAsync(async (req, res, next) => {
  try {
    await List.findByIdAndDelete(req.params.id);

    res.status(202).json({ message: "List deleted successfully" });
  } catch (err) {
    next(AppError(err, 500));
  }
});

module.exports = {
  createList,
  getAllMovies,
  deleteMovie,
};
