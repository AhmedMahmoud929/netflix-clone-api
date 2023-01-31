const router = require("express").Router();
const Movie = require("../models/Movie.model");
const verifyToken = require("../middlewares/verifyToken");
const bcrypt = require("bcrypt");

// Post a new movie
router.post("/", verifyToken, async (req, res) => {
  // check the admin identity
  if (req.tokenData.isAdmin) {
    try {
      // check if title is used
      const movieExist = await Movie.findOne({ title: req.body.title });
      if (movieExist)
        res.status(500).json({ error: "This title is already used" });
      // if valid title
      else {
        const newMovie = await new Movie(req.body).save();
        // send the response
        res
          .status(200)
          .json({ message: "Movie uploaded successfully", newMovie });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(401).json({ error: "You are not authorized" });
});

// Delete a movie
router.delete("/:id", verifyToken, async (req, res) => {
  // check the admin identity
  if (req.tokenData.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      // send the response
      res.status(200).json({ message: "Movie deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(401).json({ error: "You are not authorized" });
});

// Update a movie
router.put("/:id", verifyToken, async (req, res) => {
  // check the admin identity
  if (req.tokenData.isAdmin) {
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
        res.status(500).json(err);
      }
    } else res.status(500).json({ error: "This title alraedy used" });
  } else res.status(401).json({ error: "You are not authorized" });
});

// Get a movie
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ error });
  }
});

// Get all movies
router.get("/", verifyToken, async (req, res) => {
  // check the admin identity
  if (req.tokenData.isAdmin) {
    try {
      // filter movies
      const filter = Object.values(req.query).length;
      const movies = await Movie.find(filter ? req.query : {});
      res.status(200).json({ movies });
    } catch (error) {
      res.status(404).json({ error });
    }
  } else res.status(401).json({ error: "You are not authorized" });
});

module.exports = router;
