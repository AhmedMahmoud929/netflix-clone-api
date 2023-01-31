const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const tokenHeader = req.headers.token;
  if (tokenHeader) {
    const token = tokenHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, tokenData) => {
      if (err) res.status(403).json("Invalid token");
      else {
        req.tokenData = tokenData;
        next();
      }
    });
  } else res.status(401).json("Token is required");
};
