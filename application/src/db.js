var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", function () {
  console.log("MongoDB connection failed!");
});
db.once("open", function () {
  console.log("MongoDB connection success!");
});
