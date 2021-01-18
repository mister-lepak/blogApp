var express = require("express");
var router = express.Router();

const postController = require("../controller/postController");
const userController = require("../controller/userController");
const commentController = require("../controller/commentController");
const { post } = require("./users");

/* GET home page. */
router.get("/", postController.index);

router.get("/posts", (req, res, next) => {
  res.send("blog posts list");
});

router.get("/post/create", (req, res, next) => {
  res.send("blog create get");
});

router.post("/post/create", postController.postCreatePost);

router.get("/post/:id", postController.postDetail);

router.get("/post/:id/delete", postController.postDeleteGet);

router.post("/post/:id/delete", postController.postDeletePost);

router.get("/post/:id/update", postController.postUpdateGet);

router.post("/post/:id/update", postController.postUpdatePost);

// router.get("/log-in"), );
router.post("/sign-up", userController.userSignUp);
router.post("/log-in", userController.userLogIn);

router.get("/verifyToken", userController.verifyToken);

module.exports = router;

// router for Comments

router.post("/comment/create", commentController.commentCreatePost);

router.get("/comment/:id/delete", commentController.commentDeleteGet);

router.post("/comment/:id/delete", commentController.commentDeletePost);
