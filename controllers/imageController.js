const fs = require("fs");
const cloudinary = require("../utlis/cloudinary");
const ImageModel = require("../models/imageModel");

const uploadImage = async (req, res) => {
  try {
    const uploaded = await cloudinary.uploader.upload(req.file.path);

    const newImage = new ImageModel({ Image_Url: uploaded.secure_url });
    await newImage.save();

    // Delete local file after upload
    fs.unlink(req.file.path, (err) => {
      if (err) console.log("File deletion error:", err);
    });

    res.json({
      message: "Image Saved Successfully!",
      your_url: { image_url: uploaded.secure_url },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

module.exports = { uploadImage };
