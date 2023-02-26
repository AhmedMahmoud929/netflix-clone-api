const router = require("express").Router();
const {verifyToken} = require("../middlewares/checkLogin");
const { createList, deleteMovie, getAllMovies } = require("../controllers/listController");

// Create a new list
router.post("/", verifyToken, createList);

// Get all movies
router.get("/", verifyToken, getAllMovies).delete("/:id", verifyToken, deleteMovie);

module.exports = router;