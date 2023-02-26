const { model, Schema } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validate: [validator.isEmail, "please provide a correct email !"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    changedAt: {
      type: Date,
    },
    active: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetToken: String,
    exipreResetToken: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// HASH USER PASSWORD BEFORE SAVING TO DATABASE
userSchema.pre("save", async function (next) {
  // only hash the password if it has been modified or is new
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // generate a salt for the password hash
    const salt = await bcrypt.genSalt(10);
    // hash the password with the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // replace the password with the hashed version
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// CHECK IF USER PASSWORD TRUE
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password); // MAKE COMPARATION WITH HASH PASSWORD AND NORMAL PASSWORD
};

module.exports = model("User", userSchema);
