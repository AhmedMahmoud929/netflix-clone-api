const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String, default: "" },
    genre: { type: String, default: "" },
    content: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);
