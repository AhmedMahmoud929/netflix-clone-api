const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    // search for email and username
    const userNameExist = await User.findOne({ username: req.body.username });
    const emailExist = await User.findOne({ email: req.body.email });
    // push the errors if exist
    const errors = [];
    userNameExist && errors.push("This username is already used");
    emailExist && errors.push("This email is already used");
    // if exist errors
    if (errors.length) res.status(401).json({ errors });
    // no errors
    else {
      // encrypt the password
      const encryptedPass = await bcrypt.hash(req.body.password, 10);
      // craete new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: encryptedPass,
      });
      // save the new user
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // search for the email
    const user = await User.findOne({ email: req.body.email });
    // if user not exist
    if (!user) res.status(401).json("User not found");
    // no errors
    else {
      // check password
      const passMatchs = await bcrypt.compare(req.body.password, user.password);
      // wrong password
      if (!passMatchs) res.status(401).json("Invalid password");
      // no errors
      else {
        // create login token
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.SECRET_KEY,
          { expiresIn: "5d" }
        );
        // send the response
        res.status(200).json({ user, token });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

module.exports = router;
