import { Router } from "express";

Router.post("/register", (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
});

module.exports = Router;
