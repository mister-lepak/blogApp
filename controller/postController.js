const Post = require("../model/postModel");
require("../model/userModel");
require("../model/commentModel");
const async = require("async");

exports.index = (req, res, next) => {
  async.parallel(
    {
      posts: (callback) => {
        Post.find().populate("comment").populate("user").exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      res.json(result.posts);
    }
  );
};
