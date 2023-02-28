const router = require("express").Router();
const { checkLogin } = require("../middlewares/checkLogin");
const {
  createList,
  deleteMovie,
  getAllMovies,
} = require("../controllers/listController");

router.route("/").get(checkLogin, getAllMovies).post(checkLogin, createList);
router.route("/:id").delete(checkLogin, deleteMovie);

module.exports = router;
