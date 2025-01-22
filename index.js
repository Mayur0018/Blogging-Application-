const path = require("path");
const express = require("express");
const app = express();
const PORT = 8000;
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://mayurnish18:mayur123@cluster0.ks1hcpc.mongodb.net/")
  .then((e) => console.log("MongoDb Connected"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use("/user", userRoutes);
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.render("home");
});
app.listen(PORT, () => console.log(`Server Was S    tarted :${PORT}`));
