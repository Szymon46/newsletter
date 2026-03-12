const Joi = require("joi");
const mongoose = require("mongoose");

const typedefs = require("../typedefs");

const newsPieceSchema = mongoose.Schema({
  category: String,
  text: String,
  date: Date,
});

const News = mongoose.model("News", newsPieceSchema);

/**
 *
 * @param {string} category
 * @param {string} text
 * @returns {boolean}
 */
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

/**
 * @returns {Array.<NewsPiece>}
 */
async function getNews() {
  try {
    const news = await News.find().sort({ date: -1 });
    return news;
  } catch (err) {
    console.error(`Could not return the news: ${err}`);
    return [];
  }
}

/**
 * @param {string} id
 * @returns {boolean}
 */
async function deleteNewsPiece(id) {
  try {
    await News.deleteOne({ _id: id });
    return true;
  } catch (err) {
    console.error(`Could not delete the news piece: ${err}`);
    return false;
  }
}

/**
 *
 * @param {typedefs.NewsPieceDto} newsPiece
 * @returns
 */
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
  validateNewsPiece,
};
