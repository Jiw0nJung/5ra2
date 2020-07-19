var passportLocalMongoose = require("passport-local-mongoose");
// var autoIncrement = require('mongoose-auto-increment');
var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String },
  car: { type: String },
  manufacturer: { type: String },
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("UserInfo", userSchema);
