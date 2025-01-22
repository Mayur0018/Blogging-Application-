const { Router } = require("express");
const router = Router();
const User = require("../models/user");
router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signUp", (req, res) => {
  return res.render("signUp");
});

router.post("/signUp", async (req, res) => {
  const { FullName, email, password } = req.body;
  await User.create({
    FullName,
    email,
    password
  });
  return res.redirect("/");
});
module.exports = router;
