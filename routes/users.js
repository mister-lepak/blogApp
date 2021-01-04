var express = require("express");
var router = express.Router();
const user_controller = require("../controller/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/log-in", (req, res, next) => {
  res.send("login");
});

router.get("/sign-up", (req, res, next) => {
  res.send("sign-up");
});

router.post("/sign-up", (req, res, next) => {
  res.send("sign-up post");
});

router.get("/log-off", (req, res, next) => {
  res.send("logoff");
});

module.exports = router;
