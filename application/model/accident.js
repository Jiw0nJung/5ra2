var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var autoIncrement = require("mongoose-auto-increment");

const AccidentSchema = new mongoose.Schema({
  AccidentId: { type: Number },
  name: String,
  detail: String,
  user: String,
  applies: [
    {
      body: { type: String, required: true },
      author: { type: String, required: true },
      // createdAt: {type:Date, default:Date.now},
      status: { type: String, default: "waiting" }, // waiting, matched, rated
    },
  ],
});

AccidentSchema.plugin(autoIncrement.plugin, {
  model: "Accident",
  field: "accidentId",
  startAt: 1, //시작
  increment: 1, // 증가
});

module.exports = mongoose.model("Accident", AccidentSchema);
