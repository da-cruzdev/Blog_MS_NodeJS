const postModel = require("../models/postModel");

const getBlog = async (req, res) => {
  try {
    const posts = await postModel.find({});
    res.render("blog", { posts: posts });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getBlog,
};
