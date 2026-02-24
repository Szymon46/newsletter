const mongoose = require("mongoose");
const Joi = require("joi");

const newsPieceSchema = mongoose.Schema({
  category: String,
  text: String,
  date: Date,
});

const News = mongoose.model("News", newsPieceSchema);

async function createNewsPiece(category, text) {
  const newsPiece = News({
    category,
    text,
    date: Date.now(),
  });

  try {
    await newsPiece.save();
    return true;
  } catch (err) {
    console.error(`Could not add the news piece: ${err}`);
    return false;
  }
}

async function deleteNewsPiece(id) {
  try {
    await News.deleteOne({ _id: id });
    return true;
  } catch (err) {
    console.error(`Could not delete the news piece: ${err}`);
    return false;
  }
}

async function getNews() {
  try {
    const news = await News.find().sort({ date: -1 });
    return news;
  } catch (err) {
    console.error(`Could not return the news: ${err}`);
    return [];
  }
}

function validateNewsPiece(newsPiece) {
  const schema = Joi.object().keys({
    category: Joi.string().min(1).max(64).required(),
    text: Joi.string().min(1).max(1024).required(),
  });

  return schema.validate(newsPiece);
}

module.exports = {
  createNewsPiece,
  deleteNewsPiece,
  getNews,
  News,
  validateNewsPiece,
};
