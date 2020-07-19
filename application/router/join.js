const express = require("express");
var LocalStrategy = require("passport-local").Strategy;
var passport = require("passport");
var router = express.Router();
var User = require("../model/userInfo");

const { FileSystemWallet, Gateway } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const ccpPath = path.resolve(
  __dirname,
  "..",
  "..",
  "network",
  "connection.json"
);
const ccpJSON = fs.readFileSync(ccpPath, "utf8");
const ccp = JSON.parse(ccpJSON);

router.get("/", function (req, res) {
  res.render("join", { title: "join" });
});

// create user

// create user
router.post("/", async (req, res) => {
  const email = req.body.email;
  const car = req.body.car;
  const manufacturer = req.body.manufacturer;

  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = new FileSystemWallet(walletPath);
  console.log(`Wallet path: ${walletPath}`);

  const userExists = await wallet.exists("user1");
  if (!userExists) {
    console.log(
      'An identity for the user "user1" does not exist in the wallet'
    );
    console.log("Run the registerUser.js application before retrying");
    return;
  }
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: "user1",
    discovery: { enabled: false },
  });
  const network = await gateway.getNetwork("orai");
  const contract = network.getContract("oraicc");
  await contract.submitTransaction("addUser", email, car, manufacturer);
  console.log("Transaction has been submitted");
  await gateway.disconnect();

  res.redirect("/");
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// join
passport.use(
  "local-join",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      console.log("local-join callback called");
      var email = req.body.email;
      var password = req.body.password;
      var car = req.body.car;
      var manufacturer = req.body.manufacturer;
      User.findOne({ email: email }, function (err, user) {
        console.log(err + "얄류리" + user);
        if (err) {
          return next(err);
        }
        if (user) {
          req.flash("error", "사용자가 이미 있습니다.");
        }
        var newUser = new User({
          email: username,
          password: password,
          car: car,
          manufacturer: manufacturer,
        });
        newUser.save(done);
      });
    }
  )
);

router.post(
  "/",
  passport.authenticate("local-join", {
    successRedirect: "/login",
    failureRedirect: "/join",
    failureFlash: true,
  })
);

module.exports = router;
