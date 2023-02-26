const router = require("express").Router();
const { verifyToken, checkAdmin } = require("../middlewares/checkLogin");
const {
  getAllusers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router
  .route("/:id")
  .get(getUserById)
  .patch(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);
router.route("/").get(checkAdmin, getAllusers);

module.exports = router;
