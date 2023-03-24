const BlogSeting = require("../models/blogSettingModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res) => {
  res.send("Login here");
};

const blogSetup = async (req, res) => {
  try {
    const blogSetting = await BlogSeting.find({});
    if (blogSetting > 0) {
      res.redirect("/login");
    } else {
      res.render("blogSetup");
    }
  } catch (error) {
    console.log(error);
  }
};

const CreateblogSetup = async (req, res) => {
  try {
    const blog_title = req.body.blog_title;
    const description = req.body.description;
    const name = req.body.name;
    const email = req.body.email;
    const blog_image = req.file.filename;
    const password = await securePassword(req.body.password);
    console.log(req.body.password);
    console.log(email);

    const blogSetting = new BlogSeting({
      blog_title: blog_title,
      blog_logo: blog_image,
      description: description,
    });

    await blogSetting.save();

    const user = new User({
      name: name,
      email: email,
      password: password,
      isAdmin: 1,
    });
    console.log(user);

    const userAdmin = await user.save();
    if (userAdmin) {
      res.redirect("/login");
    } else {
      res.render("/blogSetup", { message: "BLog not setup properly" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { login, blogSetup, CreateblogSetup };
