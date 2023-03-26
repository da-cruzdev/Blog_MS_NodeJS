const express = require("express");
const { getBlog } = require("../controllers/blogController");
const blogRoute = express();

blogRoute.set("view engine", "ejs");
blogRoute.set("views", "./views");

blogRoute.use(express.static("public"));

blogRoute.get("/", getBlog);

module.exports = blogRoute;
