const router = require("express").Router();
const { checkAuth, checkAdmin } = require("../middlewares/checkLogin");
const {
  createMovie,
  deleteMovie,
  updateMovie,
  getAllMovies,
  getMovieById,
} = require("../controllers/movieController");

router
  .route("/:id")
  .get(checkAuth, getMovieById)
  .patch(checkAuth, updateMovie)
  .delete(checkAuth, deleteMovie);
router.route("/").get(checkAdmin, getAllMovies).post(checkAuth, createMovie);

module.exports = router;
