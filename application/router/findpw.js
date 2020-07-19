var express = require("express");
var router = express.Router();

var passport = require("passport");
var User = require("../model/user");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get("/", function (req, res) {
  res.render("findpw", {
    title: "findpw",
    user: req.user,
    message: req.flash("error"),
  });
});

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/findpw",
    failureFlash: true,
  }),
  function (req, res) {
    console.log("비밀번호를 찾아보자");
    res.redirect("/");
  }
);

module.exports = router;
