const express = require("express");
const adminController = require("../controllers/adminController");
const adminRoute = express();

adminRoute.get("/", adminController.blogOne);
adminRoute.get("/blog", adminController.blogTwo);
adminRoute.get("/blog-setup", adminController.blogSetup);

module.exports = adminRoute;
