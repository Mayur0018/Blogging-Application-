const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user"); // Ensure this file exists
const app = express();
const PORT = 8000;

// MongoDB Connection
mongoose
  .connect("mongodb+srv://mayurnish18:mayur123@cluster0.ks1hcpc.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Failed:", err));

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies

// EJS Setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Routes
app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.render("home"); // Ensure there's a 'home.ejs' file in the 'views' directory
});

// Start Server
app.listen(PORT, () => console.log(`Server Started on PORT: ${PORT}`));
