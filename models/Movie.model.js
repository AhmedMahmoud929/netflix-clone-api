const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique: true,
    },
    desc: {
      type: String,
      default: "",
    },
    img: { type: String, default: "" },
    imgTitle: { type: String, default: "" },
    imgSm: { type: String, default: "" },
    trailer: { type: String, default: "" },
    video: { type: String, default: "" },
    genre: { type: String, default: "" },
    year: { type: Number },
    limit: { type: Number },
    isSerie: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
