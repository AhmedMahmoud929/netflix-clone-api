const router = require("express").Router();
const { checkAuth, checkAdmin } = require("../middlewares/checkLogin");
const {
  getAllusers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router
  .route("/:id")
  .get(checkAuth, getUserById)
  .patch(checkAuth, updateUser)
  .delete(checkAuth, deleteUser);
router.route("/").get(checkAdmin, getAllusers);

module.exports = router;
