const catchAsync = require("../middlewares/catchAsync");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const AppError = require("../helpers/AppError");
const jwt = require("jsonwebtoken");

const passport = catchAsync(async (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWTEXPIRESDELAI,
  });

  return res.status(201).json({
    status: "success",
    user,
    token,
  });
});

const register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = await User.create({
    username,
    email,
    password,
  });
  passport(newUser, res);
});

const login = catchAsync(async (req, res, next) => {
  // check if the user enter the password and the email
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("please enter your email and your password", 401));
  // check if the email and the password are true
  const user = await User.findOne({ email });

  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }

  // CHANGE ACTIVE VALUE TO TRUE CAUSE USER IS ACTIVE NOW
  if (user.active === false) {
    return next(
      new AppError(
        "You have already deleted your account in order to restore contact us",
        404
      )
    );
  }

  // GIVE THE passport
  passport(user, res);
});

module.exports = { register, login };
