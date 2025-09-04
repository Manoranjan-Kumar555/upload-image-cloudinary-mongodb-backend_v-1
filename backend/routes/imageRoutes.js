const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { uploadImage, getAllImages, deleteImages, uploadImageWithForm } = require("../controllers/imageController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const random = uuidv4();
    cb(null, random + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes
router.post("/upload", upload.single("myfile"), uploadImage);
router.post("/upload-form", upload.single("file"), uploadImageWithForm);
router.get("/all",authMiddleware(["admin"]), getAllImages);
router.delete("/:id", deleteImages);

module.exports = router;
