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

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get("/", function (req, res) {
  res.render("dashboard", { title: "dashboard" });
});

router.post("/", async (req, res) => {
  const data = req.body.data;

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
  const info = Array(
    "jiwon@orai.com",
    "raining",
    "daylight",
    "wet",
    "flooded",
    "backing",
    "rearend",
    "1",
    "2",
    "3",
    "4",
    "5",
    "data"
  );
  const network = await gateway.getNetwork("orai");
  const contract = network.getContract("oraicc");
  await contract.submitTransaction(
    "addAccidents",
    info[0],
    info[1],
    info[2],
    info[3],
    info[4],
    info[5],
    info[6],
    info[7],
    info[8],
    info[9],
    info[10],
    info[11],
    info[12]
  );
  console.log("Transaction has been submitted");
  await gateway.disconnect();

  res.redirect("/dashboard");
});

module.exports = router;
