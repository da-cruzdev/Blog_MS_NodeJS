const express = require("express");
const { getBlog, getBlogDetails } = require("../controllers/blogController");
const blogRoute = express();

blogRoute.set("view engine", "ejs");
blogRoute.set("views", "./views");

blogRoute.use(express.static("public"));

blogRoute.get("/", getBlog);
blogRoute.get("/post/:id", getBlogDetails);

module.exports = blogRoute;
