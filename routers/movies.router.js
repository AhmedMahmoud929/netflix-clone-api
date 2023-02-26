const router = require("express").Router();
const { verifyToken } = require("../middlewares/checkLogin");
const {
  createMovie,
  deleteMovie,
  updateMovie,
  getAllMovies,
  getMovieById,
} = require("../controllers/movieController");

router
  .route("/:id")
  .get(getMovieById)
  .put(verifyToken, updateMovie)
  .delete(verifyToken, deleteMovie);
router.route("/").get(getAllMovies).post(verifyToken, createMovie);

module.exports = router;
