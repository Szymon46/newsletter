const express = require("express");
const _ = require("lodash");

const auth = require("../middleware/auth");
const { getUser } = require("../models/user");
const {
  getNews,
  validateNewsPiece,
  createNewsPiece,
  deleteNewsPiece,
} = require("../models/newsPiece");

const router = express.Router();

router.get("/", async (_, res) => {
  const news = await getNews();

  res.send(news);
});

router.post("/add", auth, async (req, res) => {
  const user = await getUser(req.user.username);

  if (!user) {
    res
      .status(401)
      .send("Access denied. User does not exist or is not logged in.");
    return;
  }

  const { error } = validateNewsPiece(_.pick(req.body, ["category", "text"]));

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    await createNewsPiece(req.body.category, req.body.text);
    res.send({ success: true });
  } catch (err) {
    res.send({ success: false });
  }
});

router.post("/del", auth, async (req, res) => {
  const user = await getUser(req.user.username);

  if (!user) {
    res
      .status(401)
      .send("Access denied. User does not exist or is not logged in.");
    return;
  }

  try {
    for (const id of req.body.ids) {
      await deleteNewsPiece(id);
    }
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false });
  }
});

module.exports = router;
// TODO: Add updating news? (deleting then adding a new one)
