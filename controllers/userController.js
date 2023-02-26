const AppError = require("../helpers/AppError");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const catchAsync = require("../middlewares/catchAsync");

const getAllusers = catchAsync(async (req, res, next) => {
    try {
      // get users information
      const users = req.query.limit
        ? await User.find().sort({ _id: -1 }).limit(req.query.limit)
        : await User.find();
      if (users) {
        // send the response
        res.status(200).json({
          status: "success",
          users,
        });
      }
      // no users
      else next(AppError("No users", 404));
    } catch (err) {
      next(AppError(err, 500));
    }
});

const getUserById = catchAsync(async (req, res, next) => {
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

const updateUser = catchAsync(async (req, res, next) => {
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

const deleteUser = catchAsync(async (req, res, next) => {
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

module.exports = {
  getAllusers,
  getUserById,
  updateUser,
  deleteUser,
};
