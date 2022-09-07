const express = require("express");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");

const app = express();
const User = require("./model/User");
const { body, validationResult } = require("express-validator");

require("dotenv").config();

mongoose.connect(process.env.DB_CONNECT, () => console.log("DB Connected"));
app.use(express.json());
app.use(morgan("combined"));
app.use(express.static("public"));

// ============ Routes ============ //
//Home
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Register
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});

app.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const isUser = await User.findOne({ email });
      if (isUser) {
        return res.status(403).send({ error: "Email already exists" });
      }

      const salt = bcrypt.genSaltSync(); // => Rounds por defecto es 10
      const hash = bcrypt.hashSync(password, salt);

      const newUser = new User({ name, email, password: hash, salt });

      if (name && email && password) {
        await newUser
          .save()
          .then((user) => res.status(201).json(user))
          .catch((error) => {
            throw error;
          });
        return;
      }
    } catch (error) {
      console.error({ error });
      return res.status(500).send("Something went wrong!");
    }
  }
);

// Login
app.get("/login", (req, res) => {
  res.send("login");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.send(JSON.stringify({ email, password }));
});

app.listen(3000, () => console.log("Server up and running"));
