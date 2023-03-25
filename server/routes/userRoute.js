const express = require("express");
const userRoute = express();
const bodyParser = require("body-parser");
const userController = require("../controllers/userController");
const session = require("express-session");

userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));

const config = require("../config/config");
const { adminLoginAuth } = require("../middlewares");

userRoute.use(
  session({
    secret: config.sessionSecret,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
userRoute.set("view engine", "ejs");
userRoute.set("views", "./views");

userRoute.use(express.static("public"));

userRoute.get("/login", adminLoginAuth.isLogout, userController.userLogin);
userRoute.post("/login", userController.verifyLogin);
userRoute.get("/profile", userController.profile);
userRoute.get("/logout", adminLoginAuth.isLogin, userController.userLogout);

module.exports = userRoute;
