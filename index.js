const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const User = require("./model/User");

require("dotenv").config();

mongoose.connect(process.env.DB_CONNECT, () => console.log("DB Connected"));
app.use(express.json());
app.use(morgan("combined"));
app.use(express.static("public"));

// ============ Utils ============ //
const isValidEmail = (input) => {

  return false;
};

// ============ Routes ============ //
//Home
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Register
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });

  if (name && email && isValidEmail(email) && password) {
    await newUser
      .save()
      .then((user) => res.json(user))
      .catch((error) => {throw error});
  }

  res.send("Something went wrong!");
});

app.listen(3000, () => console.log("Server up and running"));
