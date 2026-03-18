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

  return await newsPiece.save();
}

/**
 * @returns {Array.<NewsPiece>}
 */
async function getNews() {
  const news = await News.find().sort({ date: -1 });
  return news;
}

/**
 * @param {string} id
 * @returns {boolean}
 */
async function deleteNewsPiece(id) {
  await News.deleteOne({ _id: id });
}

/**
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
