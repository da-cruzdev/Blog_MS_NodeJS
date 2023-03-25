const express = require("express");
const adminController = require("../controllers/adminController");
const adminRoute = express();
const bodyParser = require("body-parser");

adminRoute.use(bodyParser.json());
adminRoute.use(bodyParser.urlencoded({ extended: true }));

adminRoute.set("view engine", "ejs");
adminRoute.set("views", "./views");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

adminRoute.use(express.static("public"));

// adminRoute.get("/login", adminController.login);
adminRoute.get("/blog-setup", adminController.blogSetup);
adminRoute.post(
  "/blog-setup",
  upload.single("blog_image"),
  adminController.CreateblogSetup
);
adminRoute.get("/dashboard", adminController.adminDashboard);

module.exports = adminRoute;
