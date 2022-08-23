const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const User = require("./model/User");

require("dotenv").config();

mongoose.connect(process.env.DB_CONNECT, () => console.log("DB Connected"));

app.use(morgan("combined"));

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

app.post("/api/register", async (req, res) => {
  //TODO: Validate the data user
  //TODO: Check if user already exists
  //TODO: Create the new user
});

app.listen(3000, () => console.log("Server up and running"));
