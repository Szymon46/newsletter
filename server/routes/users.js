const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { User } = require("../models/user");
const auth = require("../middleware/auth");

router.post("/pass", auth, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });

  if (!user) {
    res.status(400).send("Incorrect username or password.");
    return;
  }

  const validPassword = await bcrypt.compare(req.body.oldPassword, user.hash);

  if (!validPassword) {
    res.status(400).send("Incorrect username or password.");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const newHash = await bcrypt.hash(req.body.newPassword, salt);

  await User.findOneAndUpdate(
    { username: req.user.username },
    { $set: { hash: newHash } },
    { new: true }
  );
});

module.exports = router;
