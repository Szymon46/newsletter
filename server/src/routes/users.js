const express = require("express");

const auth = require("../middleware/auth");
const typedefs = require("../typedefs");
const { getUser, isValidPassword, updatePassword } = require("../models/user");

/**
 * @typedef PasswordRequestBody
 * @type {object}
 * @property {string} oldPassword
 * @property {string} newPassword
 *
 * @typedef PasswordRequest
 * @type {object}
 * @property {PasswordRequestBody} body
 * @property {typedefs.User} user
 */

const router = express.Router();

// TODO: validation when creating user - if user is admin then allow, else send an error

router.post(
  "/pass",
  auth,
  /**
   *
   * @param {PasswordRequest} req
   * @param {Response} res
   */
  async (req, res) => {
    const { newPassword, oldPassword } = req.body;

    const user = await getUser(req.user.username);

    if (!user) {
      res.status(400).send("Incorrect username or password.");
      return;
    }

    const validPassword = await isValidPassword(oldPassword, user.hash);

    if (!validPassword) {
      res.status(400).send("Incorrect username or password.");
      return;
    }

    await updatePassword(user, newPassword);
  },
);

module.exports = router;
