const Post = require("../model/postModel");
require("../model/userModel");
const Comment = require("../model/commentModel");
const async = require("async");

exports.index = (req, res, next) => {
  async.parallel(
    {
      posts: (callback) => {
        Post.find().populate("user").exec(callback);
      },
      comments: (callback) => {
        Comment.find().populate("user").exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      // console.log(result.posts);
      res.json(result);
    }
  );
};

exports.postDetail = (req, res, next) => {
  async.parallel(
    {
      post: (callback) => {
        Post.find(req.params.id)
          .populate("comment")
          .populate("user")
          .exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      res.json(result.post);
    }
  );
};
