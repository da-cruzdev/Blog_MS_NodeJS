const BlogSeting = require("../models/blogSettingModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validation } = require("../validators");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
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
    const { error, value } = validation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errorsObjects = error.details.reduce((acc, current) => {
        acc[current.context.key] = current.message;
        return acc;
      }, {});
      //   console.log(errorsObjects);
      req.flash("errors", errorsObjects);
      req.flash("formData", req.body);
      const formData = req.flash("formData")[0];
      res.render("blogSetup", { errors: errorsObjects, formData: formData });
    } else {
      const blog_title = req.body.blog_title;
      const description = req.body.description;
      const name = req.body.name;
      const email = req.body.email;
      const blog_image = req.file.filename;
      const password = await securePassword(req.body.password);

      const blogSetting = new BlogSeting({
        blog_title: blog_title,
        blog_logo: blog_image,
        description: description,
      });
      const user = new User({
        name: name,
        email: email,
        password: password,
        isAdmin: 1,
      });
      await blogSetting.save();

      const userAdmin = await user.save();
      if (userAdmin) {
        res.redirect("/login");
      } else {
        res.render("/blogSetup", { message: "Blog not set up properly" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const adminDashboard = async (req, res) => {
  try {
    res.send("Admin dash");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { blogSetup, CreateblogSetup, adminDashboard };
