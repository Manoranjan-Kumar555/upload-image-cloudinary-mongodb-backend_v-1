const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // user name
    email: { type: String, required: true }, // user email
    mobile: { type: String, required: true }, // user mobile number
    Image_Url: { type: String, required: true }, // uploaded image url
  },
  { timestamps: true }
);

module.exports = mongoose.model("Images", imageSchema);
