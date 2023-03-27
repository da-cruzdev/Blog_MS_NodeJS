const postModel = require("../models/postModel");

const getBlog = async (req, res) => {
  try {
    const posts = await postModel.find({});
    res.render("blog", { posts: posts });
  } catch (error) {
    console.log(error.message);
  }
};

const getBlogDetails = async (req, res) => {
  try {
    const post = await postModel.findOne({ _id: req.params.id });
    res.render("post", { post: post });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getBlog,
  getBlogDetails,
};
