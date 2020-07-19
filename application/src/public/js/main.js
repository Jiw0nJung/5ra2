(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var socket = io("/"); // function sendMessage(message) {
//   socket.emit("newMessage", { message });
// }
// function handleMessageNotif(data) {
//   const { message } = data;
//   console.log(`Somebody said ${message}`);
// }
// socket.on("messageNotif", handleMessageNotif);
// if (window.DeviceMotionEvent) {
//   window.addEventListener("devicemotion", deviceMotionHandler);
// }
// function deviceMotionHandler(event) {
//   let y =
//     Math.abs(event.acceleration.x) +
//     Math.abs(event.acceleration.y) +
//     Math.abs(event.acceleration.z);
//   return y;
// }
// function handleData(data) {}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMWYwYjJmZTYuanMiXSwibmFtZXMiOlsic29ja2V0IiwiaW8iXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsTUFBTSxHQUFHQyxFQUFFLENBQUMsR0FBRCxDQUFqQixDLENBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzb2NrZXQgPSBpbyhcIi9cIik7XG5cbi8vIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKG1lc3NhZ2UpIHtcbi8vICAgc29ja2V0LmVtaXQoXCJuZXdNZXNzYWdlXCIsIHsgbWVzc2FnZSB9KTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gaGFuZGxlTWVzc2FnZU5vdGlmKGRhdGEpIHtcbi8vICAgY29uc3QgeyBtZXNzYWdlIH0gPSBkYXRhO1xuLy8gICBjb25zb2xlLmxvZyhgU29tZWJvZHkgc2FpZCAke21lc3NhZ2V9YCk7XG4vLyB9XG5cbi8vIHNvY2tldC5vbihcIm1lc3NhZ2VOb3RpZlwiLCBoYW5kbGVNZXNzYWdlTm90aWYpO1xuXG4vLyBpZiAod2luZG93LkRldmljZU1vdGlvbkV2ZW50KSB7XG4vLyAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlbW90aW9uXCIsIGRldmljZU1vdGlvbkhhbmRsZXIpO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBkZXZpY2VNb3Rpb25IYW5kbGVyKGV2ZW50KSB7XG4vLyAgIGxldCB5ID1cbi8vICAgICBNYXRoLmFicyhldmVudC5hY2NlbGVyYXRpb24ueCkgK1xuLy8gICAgIE1hdGguYWJzKGV2ZW50LmFjY2VsZXJhdGlvbi55KSArXG4vLyAgICAgTWF0aC5hYnMoZXZlbnQuYWNjZWxlcmF0aW9uLnopO1xuXG4vLyAgIHJldHVybiB5O1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBoYW5kbGVEYXRhKGRhdGEpIHt9XG4iXX0=
},{}]},{},[1])