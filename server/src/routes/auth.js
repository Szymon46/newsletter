const express = require("express");

const { validateUser, getUser, isValidPassword } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const { error } = validateUser({ username, password });

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const user = await getUser(username);

  if (!user) {
    res.status(400).send("Invalid username or password");
    return;
  }

  const validPassword = await isValidPassword(password, user.hash);

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
