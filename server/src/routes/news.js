const express = require("express");

const { auth } = require("../middleware/auth");
const {
  getNews,
  validateNewsPiece,
  createNewsPiece,
  deleteNewsPiece,
} = require("../models/newsPiece");

// /api/news
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { category, text } = req.body;

  const { error } = validateNewsPiece({ category, text });

  if (error) {
    res.status(400).send({ error: error.details[0].message, errcode: 6 });
    return;
  }

  try {
    const newsPiece = await createNewsPiece(req.body.category, req.body.text);
    res.status(201).send({ newsPiece });
  } catch (err) {
    res.status(500).send({ error: "Internal server error", errcode: 7 });
  }
});

router.get("/", async (_, res) => {
  try {
    const news = await getNews();
    res.send({ news });
  } catch (err) {
    res.status(500).send({ error: "Internal server error", errcode: 7 });
  }
});

router.delete("/", auth, async (req, res) => {
  const { ids } = req.body;

  try {
    for (const id of ids) {
      await deleteNewsPiece(id);
    }
    res.send({});
  } catch (err) {
    res.status(500).send({ error: "Internal server error", errcode: 7 });
  }
});

module.exports = router;
