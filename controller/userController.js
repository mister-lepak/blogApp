const User = require("../model/userModel");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const async = require("async");
const utils = require("../util");
const { body, validationResult } = require("express-validator");

exports.userLogIn = (req, res, next) => {
  const user = req.body.username;
  const pwd = req.body.password;
  const userData = {};

  async.parallel(
    {
      user: (callback) => {
        User.find().exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      // console.log(result.user[0]);
      Object.assign(userData, result.user[0]);
      // console.log(userData._doc);
      // return 400 status if username/password is not exist
      if (!user || !pwd) {
        return res.status(400).json({
          error: true,
          message: "Username or Password is required.",
        });
      }

      // return 401 status if the credential is not matched.
      if (user !== userData._doc.username || pwd !== userData._doc.password) {
        console.log(userData._doc);
        console.log(user);
        return res.status(401).json({
          error: true,
          message: "Username or Password is wrong.",
        });
      }

      const token = utils.generateToken(userData._doc);

      const userObj = utils.getCleanUser(userData._doc);

      return res.json({ user: userObj, token });
    }
  );
};

exports.verifyToken = (req, res, next) => {
  const userData = {};

  async.parallel(
    {
      user: (callback) => {
        User.find().exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      Object.assign(userData, result.user[0]);

      // Check header or url parameters or post parameters for token
      const token = req.query.token;
      if (!token) {
        return res.status(400).json({
          error: true,
          message: "Token is required",
        });
      }
      // Check token that was passed by decoding token using secret
      jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err)
          return res.status(401).json({
            error: true,
            message: "Invalid token.",
          });
        // return 401 status if the userId does not match.
        if (user.username !== userData._doc.username) {
          return res.status(401).json({
            error: true,
            message: "Invalid user.",
          });
        }

        // get basic user details
        var userObj = utils.getCleanUser(userData._doc);
        return res.json({ user: userObj, token });
      });
    }
  );
};

exports.userSignUp = [
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    var comment = new User({
      username: req.body.username,
      password: req.body.password,
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
        res.send("Success!");
      });
    }
  },
];

exports.userDeleteGet = (req, res, next) => {
  async.parallel(
    {
      user: (callback) => {
        User.findById(req.params.id).exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      res.json(result);
    }
  );
};

exports.userDeletePost = (req, res, next) => {
  async.parallel(
    {
      user: (callback) => {
        User.findById(req.params.id).exec(callback);
      },
    },
    (err, result) => {
      if (err) return next(err);
      User.findByIdAndRemove(req.params.id, function deleteUser(err) {
        if (err) return next(err);
        res.send("successfully deleted");
      });
    }
  );
};
