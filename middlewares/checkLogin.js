const AppError = require("../helpers/AppError");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const catchAsync = require("./catchAsync");

const verifyToken = catchAsync(async (req, res, next) => {
  // check if the jwt is exists
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  )
    return next(new AppError("you are not Authorized", 401));
  //get the jwt
  const token = req.headers.authorization.split(" ")[1];
  //check if the token is valid
  const verified = jwt.verify(token, process.env.SECRET_KEY); // rise an error
  //check if the user still exists
  const user = await User.findOne({ _id: verified.id });
  if (!user) return next(new AppError("This user is no longer exists", 401));
  // validate and call next
  req.user = user;
  next();
});

const checkAdmin = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findById(decoded.id);
  if (!user.isAdmin) {
    next(AppError("You are not authorized to perform this action", 401))
  }
  next()
});

module.exports = { verifyToken, checkAdmin };
