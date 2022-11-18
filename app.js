const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const middleware = require("./middleware/auth");
var moment = require("moment");

const JWT_SECRET = "aseiopruqawiopfha$%^&$^%#*^%(&*@opsinvuaiosdu3209857434w";

mongoose.connect(
  "mongodb+srv://sabisuperadmin:sabiteamiot7@sabismarthome.72vt8rm.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.post("/api/login", async function (req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Wrong credentials!" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1H" },
    );
    return res.json({
      status: 'Ok',
      message: 'Authentication successful!',
      data: token
    });
    // return res.json({ status: "Ok", data: token });
  }

  res.json({ status: "error", error: "Wrong credentials!" });
});

app.post("/api/register", async function (req, res) {
  const { username, email, password: plainTextPassword } = req.body;

  if (!username || typeof username !== "string") {
    // alert("Invalid username!");
    return res.json({ status: "error", error: "Invalid username!" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    // alert("Invalid password!");
    return res.json({ status: "error", error: "Invalid password!" });
  }

  if (plainTextPassword.length < 6 || plainTextPassword.length > 8) {
    // alert("Password should be atleast 6 and maximum 8 characters!");
    return res.json({
      status: "error",
      error: "Password should be atleast 6 and maximum 8 characters!",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);
  try {
    const response = await User.create({ username, email, password });
    console.log("User created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      // alert("Username already exists!");
      //duplicate key
      return res.json({ status: "error", error: "Username already exists!" });
    }
    throw error;
  }
  res.json({ status: "Ok" });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Server"s up n runnin');
  console.log(moment().format("LTS"));
});
