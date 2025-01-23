const { Router } = require("express");
const User = require("../models/user");
const router = Router();
router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signUp", (req, res) => {
  return res.render("signUp");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const token = await User.matchPassword(email, password);
  console.log("user", token);
  return res.cookie("token",token).redirect("/");
});
router.post("/signUp", async (req, res) => {
  const { FullName, email, password } = req.body;
  await User.create({
    FullName,
    email,
    password,
  });
  return res.redirect("/");
});
module.exports = router;
