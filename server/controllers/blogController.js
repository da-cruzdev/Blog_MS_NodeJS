const postModel = require("../models/postModel");
const { ObjectId } = require("mongodb");

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

    let commentId = new ObjectId();

    await postModel.findByIdAndUpdate(
      { _id: post_id },
      {
        $push: {
          comments: { _id: commentId, username: username, comment: comment },
        },
      }
    );

    res
      .status(200)
      .send({ succes: true, msg: "Comment added", _id: commentId });
  } catch (error) {
    res.status(200).send({ succes: false, msg: error.message });
  }
};

const doReply = async (req, res) => {
  try {
    let replyId = new ObjectId();

    await postModel.updateOne(
      {
        _id: new ObjectId(req.body.post_id),
        "comments._id": new ObjectId(req.body.comment_id),
      },
      {
        $push: {
          "comments.$.replies": {
            _id: replyId,
            name: req.body.name,
            reply: req.body.reply,
          },
        },
      }
    );
    res.status(200).send({ succes: true, msg: "Reply added !!", _id: replyId });
  } catch (error) {
    res.status(200).send({ succes: false, msg: error.message });
  }
};

module.exports = {
  getBlog,
  getBlogDetails,
  addComment,
  doReply,
};
