// Importing the packages (express)
const express = require("express");
const connectDatabase = require("./database/database");
const dotenv = require("dotenv");

// Creating an express app
const app = express();

// Express Json Config
app.use(express.json());

// dotenv Configuration
dotenv.config();

// Connecting to database
connectDatabase();

// Defining the port
const PORT = process.env.PORT;

// Making a test endpoint
// Endpoints : POST, GET, PUT , DELETE
app.get("/test", (req, res) => {
  res.send("Test API is Working!....");
});

// Configuring Routes of User
app.use("/api/user", require("./routes/userRoutes"));

// http://localhost:5000/api/user

// http://localhost:5000/test

// Starting the server (always at the last)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}....`);
});