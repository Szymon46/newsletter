const express = require("express");
const router = express.Router();
const _ = require("lodash");

const newsPiece = require("../models/newsPiece");
const auth = require("../middleware/auth");
const { User } = require("../models/user");

// Returning all news
router.get("/", async (req, res) => {
  const news = await newsPiece.getNews();

  res.send(news);
});

// Adding a single news piece
router.post("/add", auth, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });

  if (!user) {
    res
      .status(401)
      .send("Access denied. User does not exist or is not logged in.");
    return;
  }

  const { error } = newsPiece.validateNewsPiece(
    _.pick(req.body, ["category", "text"])
  );

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    await newsPiece.createNewsPiece(req.body.category, req.body.text);
    res.send({ success: true });
  } catch (err) {
    res.send({ success: false });
  }
});

// Deleting multiple news
router.post("/del", auth, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });

  if (!user) {
    res
      .status(401)
      .send("Access denied. User does not exist or is not logged in.");
    return;
  }

  try {
    for (const id of req.body.ids) {
      await newsPiece.deleteNewsPiece(id);
    }
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false });
  }
});

// TODO: Add updating news? (deleting then adding a new one)

module.exports = router;
