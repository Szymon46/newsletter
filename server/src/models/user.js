const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const typedefs = require("../typedefs");

const userSchema = mongoose.Schema({
  username: String,
  hash: String,
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      username: this.username,
    },
    process.env.JWT_PRIVATE_KEY,
  );
};

const UserModel = mongoose.model("User", userSchema);

/**
 * @param {string} username
 * @param {string} password
 */
async function createUser(username, password) {
  const salt = await bcrypt.genSalt(16);
  const hash = await bcrypt.hash(password, salt);

  const newUser = UserModel({
    username,
    hash,
  });

  await newUser.save();
}

/**
 * @returns {Array.<typedefs.User>}
 */
async function getUsers() {
  return await UserModel.find();
}

/**
 * @param {string} username
 * @returns {typedefs.User}
 */
async function getUser(username) {
  return await UserModel.findOne({ username });
}

/**
 * @param {typedefs.User} user
 * @param {string} newPassword
 */
async function updatePassword(user, newPassword) {
  const salt = await bcrypt.genSalt(16);
  const newHash = await bcrypt.hash(newPassword, salt);

  await UserModel.findOneAndUpdate(
    { username: user.username },
    { $set: { hash: newHash } },
    { new: true },
  );
}

/**
 * @param {string} id
 */
async function deleteUser(id) {
  await UserModel.deleteOne({ _id: id });
}

/**
 * @param {typedefs.User} user
 * @returns {boolean}
 */
async function isAdmin(user) {
  return user.username === "admin" ? true : false;
}

/**
 * @param {string} password
 * @param {string} hash
 * @returns {boolean}
 */
async function isValidPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

/**
 * @param {typedefs.User} user
 * @returns
 */
function validateUser(user) {
  const schema = Joi.object().keys({
    username: Joi.string().min(1).max(64).required(),
    password: Joi.string().min(1).max(512).required(),
  });

  return schema.validate(user);
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updatePassword,
  deleteUser,
  isAdmin,
  isValidPassword,
  validateUser,
};
