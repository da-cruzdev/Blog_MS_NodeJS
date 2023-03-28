const BlogSeting = require("../models/blogSettingModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validation, postValidator } = require("../validators");
const Post = require("../models/postModel");

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
    const allPost = await Post.find({});
    res.render("admin/dashboard", { posts: allPost });
  } catch (error) {
    console.log(error);
  }
};

const loadPost = async (req, res) => {
  try {
    res.render("admin/postDash");
  } catch (error) {
    console.log(error.message);
  }
};

const createPost = async (req, res) => {
  try {
    const { error } = postValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.reduce((acc, current) => {
        acc[current.context.key] = current.message;
        return acc;
      }, {});
      req.flash("errors", errors);
      req.flash("formData", req.body);
      const formData = req.flash("formData")[0];
      res.render("admin/postDash", { errors: errors, formData: formData });
    } else {
      let image = req.body.image || "";
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        image: image,
      });
      const newPost = await post.save();
      req.flash("info", "Post created successfully");
      const messages = await req.flash("info");
      res.send({
        success: true,
        msg: "Post created successfully",
        _id: newPost._id,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      msg: error.message,
    });
  }
};

const uploadImage = async (req, res) => {
  try {
    let imagePath = "/images";
    imagePath = imagePath + "/" + req.file.filename;

    res.send({
      success: true,
      msg: "Post Image upload successfully",
      path: imagePath,
    });
  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
};

module.exports = {
  blogSetup,
  CreateblogSetup,
  adminDashboard,
  loadPost,
  createPost,
  uploadImage,
};
