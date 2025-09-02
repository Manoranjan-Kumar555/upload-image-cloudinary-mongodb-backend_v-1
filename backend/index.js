const express = require('express'); // Optional here unless you're using it
const dotenv = require('dotenv');
const app = require('./app');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8081;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port :-  http://localhost:${PORT}`);
});
