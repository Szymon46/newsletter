const express = require("express");

const { validateUser, getUser, isValidPassword } = require("../models/user");

// /api/auth
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const { error } = validateUser({ username, password });

  if (error) {
    res.status(400).send({ error: error.details[0].message, errcode: 4 });
    return;
  }

  const user = await getUser(username);

  if (!user) {
    res.status(400).send({ error: "Invalid username or password", errcode: 5 });
    return;
  }

  const validPassword = await isValidPassword(password, user.hash);

  if (!validPassword) {
    res.status(400).send({ error: "Invalid username or password", errcode: 5 });
    return;
  }

  const token = user.generateAuthToken();

  res
    .header("access-control-expose-headers", "x-auth-token")
    .header("x-auth-token", token)
    .send({ username: user.username });
});

module.exports = router;
