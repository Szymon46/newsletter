const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  username: String,
  hash: String,
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      username: this.username,
    },
    process.env.JWT_PRIVATE_KEY
  );
};

const User = mongoose.model("User", userSchema);

async function createUser({ username, hash }) {
  // TODO: validation - if user is admin then allow, else send an error

  const user = User({
    username,
    hash,
  });

  await user
    .save()
    .catch((err) => console.log(`Could not add the user ${err}`));
}

async function deleteUser() {
  // ...
}

async function updatePassword() {
  // ...
}

function validateUser(user) {
  const schema = Joi.object().keys({
    username: Joi.string().min(1).max(64).required(),
    password: Joi.string().min(1).max(512).required(),
  });

  return schema.validate(user);
}

module.exports = {
  createUser,
  deleteUser,
  updatePassword,
  validateUser,
  User,
};
