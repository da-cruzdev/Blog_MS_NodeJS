const express = require("express");
const adminController = require("../controllers/adminController");
const adminRoute = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const config = require("../config/config");

adminRoute.use(bodyParser.json());
adminRoute.use(bodyParser.urlencoded({ extended: true }));

adminRoute.set("view engine", "ejs");
adminRoute.set("views", "./views");

adminRoute.use(
  session({
    secret: config.sessionSecret,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

const multer = require("multer");
const path = require("path");
const { adminLoginAuth } = require("../middlewares");

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
adminRoute.get(
  "/dashboard",
  adminLoginAuth.isLogin,
  adminController.adminDashboard
);
adminRoute.get(
  "/create-post",
  adminLoginAuth.isLogin,
  adminController.loadPost
);

adminRoute.post(
  "/create-post",
  adminLoginAuth.isLogin,
  adminController.createPost
);

adminRoute.post(
  "/upload-post-image",
  upload.single("image"),
  adminLoginAuth.isLogin,
  adminController.uploadImage
);

adminRoute.post(
  "/delete-post",
  adminLoginAuth.isLogin,
  adminController.deletePost
);

module.exports = adminRoute;
