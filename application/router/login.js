const express = require("express");
var LocalStrategy = require("passport-local").Strategy;
var passport = require("passport");
var router = express.Router();
var User = require("../model/userInfo");

router.get("/", function (req, res) {
  res.render("login", { title: "login" });
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      console.log("local-login callback called");
      var username = req.body.email;
      var password = req.body.password;

      User.findOne({ email: username }, function (err, user) {
        // console.log("find one안에 ㅇ;ㅆ어 ~~", user, "뾰용요요", err);
        if (err) {
          return next(err);
        }
        if (user) {
          console.log(user);
        }
        if (!user) {
          req.flash("error", "존재하지 않는 아이디입니다");
        }
        return done(null, user);
      });
    }
  )
);

// ajax post custom callback
// router.post("/", function(req, res, next){
//     passport.authenticate('local-login', function(err,user,info){
//         if(err) res.status(500).json(err);
//         if(!user) { return res.status(401).json(info.message)};
//         req.logIn(user, function(err){
//         if(err) { return next(err); }
//         return res.json(user);
//         })
//     })(req, res, next);
// })

router.post(
  "/",
  passport.authenticate("local-login", {
    successRedirect: "/dashboard",
    failureRedirect: "/dashboard",
    failureFlash: true,
  })
);

module.exports = router;
