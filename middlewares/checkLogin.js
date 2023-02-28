const AppError = require("../helpers/AppError");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const catchAsync = require("./catchAsync");

const checkAuth = catchAsync(async (req, res, next) => {
  // check if there is a token
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  )
    return next(new AppError(401, "Please log in first"));
  // get the token
  const token = req.headers.authorization.split(" ")[1];
  //check if the token if true
  const verified = jwt.verify(token, process.env.SECRET_KEY); // rising an error
  //check if user still exists
  const user = await User.findById(verified.id);
  if (!user) next(new AppError(401, "this user no more exists"));
  // check if the user doesnt change his password after a given jwt
  if (await user.isChanged(verified.iat))
    return next(new AppError(401, "the user has been changed his password"));
  req.user = user;
  next();
});

const checkAdmin = catchAsync(async (req, res, next) => {
  console.log("****************checkAdmin**************");
  // ? console.log("req.user", req.headers.authorization);

  if (!req.headers.authorization)
    return next(new AppError(404, "Please login first"));
  const token = req.headers.authorization.split(" ")[1];
  console.log("token => ", token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded.id);
  const user = await User.findById(decoded.id);
  console.log("user => is admin ", user);
  if (!user.isAdmin)
    return next(
      new AppError(
        403,
        "Forbidden - Only admins are allowed to access this route."
      )
    );
  req.userData = decoded;
  console.log(user.isAdmin);

  // If the user is an admin, call the next middleware function
  next();
});

module.exports = { checkAuth, checkAdmin };
