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
  try {
    const token = await User.matchPassword(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email Or Password",
    });
  }
});

router.get("/logout",(req,res)=>{
 res.clearCookie("tooken",token).redirect("/");
})
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
