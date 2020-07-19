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

router.get("/", async (req, res) => {
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
  const result = await contract.evaluateTransaction(
    "viewAccidents",
    "jiwon@orai.com"
  );
  console.log(
    `Transaction has been evaluated, result is: ${result.toString()}`
  );

  var obj = JSON.parse(result);

  res.render("query", { data: obj });
});

module.exports = router;
