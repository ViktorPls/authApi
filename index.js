const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
// console.log(process.env)

mongoose.connect(process.env.DB_CONNECT, () => console.log("DB Connected"));

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

app.listen(3000, () => console.log("Server up and running"));
