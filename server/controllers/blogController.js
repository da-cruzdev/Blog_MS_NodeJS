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

const addComment = async (req, res) => {
  try {
    let post_id = req.body.post_id;
    let username = req.body.username;
    let comment = req.body.comment;

    await postModel.findByIdAndUpdate(
      { _id: post_id },
      {
        $push: {
          comments: { username: username, comment: comment },
        },
      }
    );

    res.status(200).send({ succes: true, msg: "Comment added" });
  } catch (error) {
    res.status(200).send({ succes: false, msg: error.message });
  }
};

module.exports = {
  getBlog,
  getBlogDetails,
  addComment,
};
