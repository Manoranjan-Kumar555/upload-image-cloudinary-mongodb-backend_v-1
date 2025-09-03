const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./db/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const imageRoutes = require("./routes/imageRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config({ path: ".env" });

const app = express();

// Middleware
const origin = ["http://localhost:5173", "http://localhost:5174"];
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

// Health check
app.get("/", (req, res) => {
  const formattedDateTime = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });

  res.json({
    success: true,
    message:
      "Welcome! to UPLOAD IMAGE WITH Cloudinary with MongoDB... (Youtuber :- Deepak Saini...)",
    datetime: formattedDateTime,
  });
});

// Routes
app.use("/api/image", imageRoutes);
// Routes
app.use("/api/auth", authRoutes);

// Error handler
app.use(errorHandler);

// DB Connection
dbConnection();

module.exports = app;
