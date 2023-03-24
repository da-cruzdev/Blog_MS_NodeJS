const express = require("express");
const userRoute = express();
const bodyParser = require("body-parser");
const userController = require("../controllers/userController");

userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));

userRoute.set("view engine", "ejs");
userRoute.set("views", "./views");

userRoute.use(express.static("public"));

userRoute.get("/login", userController.userLogin);
userRoute.post("/login", userController.verifyLogin);
userRoute.get("/profile", userController.profile);

module.exports = userRoute;
