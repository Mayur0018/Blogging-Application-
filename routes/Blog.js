const { Router } = require("express");
const router = Router();
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()} - ${file.originalname}`
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });s
});
router.post("/", upload.single("Cover-image"), (req, res) => {
  console.log(req.body);
  return res.redirect("/");
});
module.exports = router;
