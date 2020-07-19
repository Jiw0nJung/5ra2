import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./db";
import "../model/passport";

dotenv.config();

const PORT = 8000;
const app = express();

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(express.static(join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport

var LocalStrategy = require("passport-local").Strategy;
var passport = require("passport");
var session = require("express-session");
// flash는 session이 필요하므로 반드시 session 아래에 정의해야 함
var flash = require("connect-flash");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Router

var indexRouter = require("../router/index");
var joinRouter = require("../router/join");
var loginRouter = require("../router/login");
var dashRouter = require("../router/dashboard");
var queryRouter = require("../router/query");
var historyRouter = require("../router/history");

app.use("/", indexRouter);
app.use("/join", joinRouter);
app.use("/login", loginRouter);
app.use("/dashboard", dashRouter);
app.use("/query", queryRouter);
app.use("/history", historyRouter);

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);

io.on("connection", (socket) => {
  socket.on("newMessage", (message) => {
    socket.broadcast.emit("messageNotif", { message });
  });
});
