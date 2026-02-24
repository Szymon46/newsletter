const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { User, validateUser } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    res.status(400).send("Invalid username or password");
    return;
  }

  const validPassword = await bcrypt.compare(req.body.password, user.hash);

  if (!validPassword) {
    res.status(400).send("Invalid username or password");
    return;
  }

  const token = user.generateAuthToken();

  res
    .header("access-control-expose-headers", "x-auth-token")
    .header("x-auth-token", token)
    .send({ username: user.username });
});

module.exports = router;
