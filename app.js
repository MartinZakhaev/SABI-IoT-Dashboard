const express = require("express");
const bodyParser = require("body-parser");
var moment = require("moment");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/pages/login.html");
});

app.get("/dashboard", function (req, res) {
  res.sendFile(__dirname + "/pages/index.html");
});

app.get("/statistic", function (req, res) {
  res.sendFile(__dirname + "/pages/statistic.html");
});

app.get("/about-us", function (req, res) {
  res.sendFile(__dirname + "/pages/about-us.html");
});

app.get("/privacy-policy", function (req, res) {
  res.sendFile(__dirname + "/pages/privacy-policy.html");
});

app.get("/account", function (req, res) {
  res.sendFile(__dirname + "/pages/account.html");
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/pages/login.html");
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Server"s up n runnin');
  console.log(moment().format("LTS"));
});
