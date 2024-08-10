const express = require("express");
const isloggedin = require("../Middlewares/isloggedin");
const router = express.Router();

router.get("/", function (req, res) {
  let error = req.flash("Error");
  res.send("hello");
});

router.get("/logout",isloggedin, function (req, res) {
  res.render("/");
});

module.exports = router;
