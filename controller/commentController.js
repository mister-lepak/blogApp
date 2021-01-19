const Comment = require("../model/commentModel");
const { body, validationResult } = require("express-validator");
const async = require("async");

exports.commentCreatePost = [
  body("user", "User's name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Comment's content must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    var comment = new Comment({
      user: req.body.user,
      content: req.body.content,
      post: req.body.post,
    });

    if (!errors.isEmpty()) {
      console.log("there is an error on validationResult");
      return;
    } else {
      comment.save((err) => {
        if (err) {
          console.log("error while saving");
          return next(err);
        }
        res.json({});
      });
    }
  },
];

exports.commentDeleteGet = (req, res, next) => {
  async.parallel(
    {
      comment: (callback) => {
        Comment.findById(req.params.id).exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      res.json(result);
    }
  );
};

exports.commentDeletePost = (req, res, next) => {
  async.parallel(
    {
      comment: (callback) => {
        Comment.findById(req.params.id).exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      Comment.findByIdAndRemove(req.params.id, function deleteComment(err) {
        if (err) return next(err);
        res.send("successfully deleted");
      });
    }
  );
};
