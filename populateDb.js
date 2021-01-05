#! /usr/bin/env node

const userArgs = process.argv.slice(2);

const async = require("async");
const Post = require("./model/postModel");
const User = require("./model/userModel");
const Comment = require("./model/commentModel");

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const posts = [];
const users = [];
const comments = [];

const userCreate = (username, password, cb) => {
  userDetail = {
    username,
    password,
  };

  const user = new User(userDetail);
  user.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New User:" + user);
    users.push(user);
    cb(null, user);
  });
};

const commentCreate = (content, published, user, cb) => {
  commentDetail = {
    content,
    published,
    user,
  };

  const comment = new Comment(commentDetail);
  comment.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Comment:" + comment);
    comments.push(comment);
    cb(null, comment);
  });
};

const postCreate = (title, content, published, user, comment, cb) => {
  postDetail = {
    title,
    content,
    published,
    user,
    comment,
  };

  const post = new Post(postDetail);
  post.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Post:" + post);
    posts.push(post);
    cb(null, post);
  });
};

const createUser = (cb) => {
  async.series(
    [
      (callback) => {
        userCreate("a", "b", callback);
      },
    ],
    cb
  );
};

const createComment = (cb) => {
  async.series(
    [
      (callback) => {
        commentCreate("Testing Comment", true, users[0], callback);
      },
    ],
    cb
  );
};

const createPost = (cb) => {
  async.series(
    [
      (callback) => {
        postCreate(
          "Test",
          "Testing Post",
          true,
          users[0],
          comments[0],
          callback
        );
      },
    ],
    cb
  );
};

async.series(
  [createUser, createComment, createPost],

  (err, results) => {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("POSTS: " + posts);
    }

    mongoose.connection.close();
  }
);
