const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    Image_Url: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Images", imageSchema);
