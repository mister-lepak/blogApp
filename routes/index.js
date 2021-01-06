var express = require("express");
var router = express.Router();

const postController = require("../controller/postController");

/* GET home page. */
router.get("/", postController.index);

router.get("/posts", (req, res, next) => {
  res.send("blog posts list");
});

router.get("/post/create", (req, res, next) => {
  res.send("blog create get");
});

router.post("/post/create", (req, res, next) => {
  res.send("blog create post");
});

router.get("/post/:id", (req, res, next) => {
  res.send("blog post detail");
});

router.get("/post/:id/delete", (req, res, next) => {
  res.send("blog delete get");
});

router.post("/post/:id/delete", (req, res, next) => {
  res.send("blog delete post");
});

router.get("/post/:id/update", (req, res, next) => {
  res.send("blog update get");
});

router.post("/post/:id/update", (req, res, next) => {
  res.send("blog update post");
});

module.exports = router;
