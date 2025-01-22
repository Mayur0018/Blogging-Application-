const { Router } = require("express");
const router = Router();

router.get("/signin", (req, res) => {
  return req.render("signin");
});

router.get("/signUp", (req, res) => {
  return req.render("signup");
});

router.post("/signUp", (req, res) => {
  const { FullName, email, password } = req.body;
});
module.exports = router;
