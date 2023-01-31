const router = require("express").Router();
const User = require("../models/User.model");
const verifyToken = require("../middlewares/verifyToken");
const bcrypt = require("bcrypt");

// Delete user
router.delete("/:id", verifyToken, async (req, res) => {
  // check the user identity
  if (req.params.id === req.tokenData.id || req.tokenData.isAdmin) {
    try {
      // delete the user
      await User.findByIdAndDelete(req.params.id);
      // send the response
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(401).json({ error: "You are not authorized" });
});

// Update user
router.patch("/:id", verifyToken, async (req, res) => {
  // check the user identity
  if (req.params.id === req.tokenData.id || req.tokenData.isAdmin) {
    try {
      // hashing the password if exist
      if (req.body.password)
        req.body.password = await bcrypt.hash(req.body.password, 10);
      // update user information
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      // send the response
      res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(401).json({ error: "You are not authorized" });
});

// Get single user
router.get("/:id", async (req, res) => {
  try {
    // get user information
    const user = await User.findById(req.params.id);
    if (user) {
      // expect the password
      const { password, ...userInfo } = user._doc;
      // send the response
      res.status(200).json(userInfo);
    }
    // user not found
    else res.status(404).json({ error: "User not found" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all users
router.get("/", verifyToken, async (req, res) => {
  if (req.tokenData.isAdmin) {
    try {
      // get users information
      const users = req.query.limit
        ? await User.find().sort({ _id: -1 }).limit(req.query.limit)
        : await User.find();
      if (users) {
        // send the response
        res.status(200).json(users);
      }
      // no users
      else res.status(404).json({ error: "No users" });
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(401).json({ error: "You are not authorized" });
});

module.exports = router;
