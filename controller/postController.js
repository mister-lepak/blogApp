const Post = require("../model/postModel");
require("../model/userModel");
const Comment = require("../model/commentModel");
const async = require("async");
const { body, validationResult } = require("express-validator");
const { post } = require("../app");

exports.index = (req, res, next) => {
  // console.log(req.user);
  // if (!req.user)
  //   return res
  //     .status(401)
  //     .json({ success: false, message: "Invalid user to access it" });

  async.parallel(
    {
      posts: (callback) => {
        Post.find().exec(callback);
      },
      comments: (callback) => {
        Comment.find().populate("post").exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      // console.log(result.comments);
      res.json(result);
    }
  );
};

exports.postDetail = (req, res, next) => {
  async.parallel(
    {
      post: (callback) => {
        Post.find({ _id: req.params.id }).populate("user").exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      res.json(result.post);
    }
  );
};

exports.postCreateGet = (req, res, next) => {
  async.parallel(
    {
      users: (callback) => {
        User.find().exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      res.json(result.users);
    }
  );
};

exports.postCreatePost = [
  // Validate and Sanitize
  body("title", "Title cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("content", "Content cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(req.body.user);
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      username: req.body.user,
    });

    if (!errors.isEmpty()) {
      res.json(errors);
      return;
    } else {
      post.save((err) => {
        if (err) {
          console.log(post);
          return next(err);
        }
      });
    }
  },
];

exports.postDeleteGet = (req, res, next) => {
  async.parallel(
    {
      post: (callback) => {
        Post.findById(req.params.id).exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      res.json(result.post);
    }
  );
};

exports.postDeletePost = (req, res, next) => {
  async.parallel(
    {
      post: (callback) => {
        Post.findById(req.params.id).exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      Post.findByIdAndRemove(req.params.id, function deletePost(err) {
        if (err) return next(err);
        // res.redirect("/dashboard");
      });
    }
  );
};

exports.postUpdateGet = (req, res, next) => {
  async.parallel(
    {
      post: (callback) => {
        Post.findById(req.params.id).exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      if (result.post == null) {
        var err = new Error("Post not found");
        err.status = 404;
        return next(err);
      }

      res.json(result.post);
    }
  );
};

exports.postUpdatePost = [
  body("title", "Title cannot be empty").trim().isLength({ min: 1 }).escape(),
  body("content", "Content cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    var post = new Post({
      title: req.body.title,
      content: req.body.content,
      username: req.body.user,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          post: (callback) => {
            Post.findById(req.params.id).exec(callback);
          },
        },
        (err, result) => {
          if (err) return next(err);
          console.log(errors);
          res.json(result.post);
        }
      );
      return;
    } else {
      Post.findByIdAndUpdate(req.params.id, post, {}, (err, thePost) => {
        console.log(err);
        if (err) return next(err);
        console.log("Update Success!");
        res.json(post);
      });
    }
  },
];
