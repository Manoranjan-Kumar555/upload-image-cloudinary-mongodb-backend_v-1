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

// upload image with form (name, email, mobile)
const uploadImageWithForm = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploaded = await cloudinary.uploader.upload(req.file.path);

    const newImage = new ImageModel({
      Image_Url: uploaded.secure_url,
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
    });
    await newImage.save();

    fs.unlink(req.file.path, (err) => {
      if (err) console.log("File deletion error:", err);
    });

    res.json({
      message: "Image Saved Successfully!",
      data: {
        name: newImage.name,
        email: newImage.email,
        mobile: newImage.mobile,
        image_url: uploaded.secure_url,
      },
    });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// Fetch all images
const getAllImages = async (req, res) => {
  try {
    const images = await ImageModel.find().sort({ createdAt: -1 }); // newest first
    res.json({
      message: "Fetched all images successfully!",
      count: images.length,
      images,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch images", error: error.message });
  }
};

// delete the images from the database
const deleteImages = async (req, res) => {
  try {
    const { id } = req.params; // image document _id

    const image = await ImageModel.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // delete from cloudinary
    if (image.Public_Id) {
      await cloudinary.uploader.destroy(image.Public_Id);
      console.log(Public_Id);
    }

    // delete from database
    await ImageModel.findByIdAndDelete(id);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete image", error: error.message });
  }
};

module.exports = {
  uploadImage,
  getAllImages,
  deleteImages,
  uploadImageWithForm,
};
