const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnection = async () => {
  try {
    const mongoDbConnection = await mongoose.connect(process.env.MONGODB_CONNECT_URL, {
      dbName: "Image_Upload_Cloudinary_&_MongoDB", // Ensure this matches your database name
      useNewUrlParser: true,
      useUnifiedTopology: true, // optional but recommended
    });
    console.log(
      `Connected to MongoDB at: ${mongoDbConnection.connection.host}`
    );
    console.log("MongoDB connection successful");
    console.log("________________");
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = dbConnection;
