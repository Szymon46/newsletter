const express = require("express");

const { auth, adminAuth } = require("../middleware/auth");
const typedefs = require("../typedefs");
const {
  getUser,
  isValidPassword,
  updatePassword,
  createUser,
  getUsers,
  validateUser,
} = require("../models/user");

/**
 * @typedef CreateUserRequest
 * @type {object}
 * @property {CreateUserRequestBody} body
 * @property {typedefs.UserAuthData} user
 *
 * @typedef CreateUserRequestBody
 * @type {object}
 * @property {string} username
 * @property {string} password
 *
 * @typedef PasswordRequestBody
 * @type {object}
 * @property {string} oldPassword
 * @property {string} newPassword
 *
 * @typedef PasswordRequest
 * @type {object}
 * @property {PasswordRequestBody} body
 * @property {typedefs.UserAuthData} user
 */

// /api/users
const router = express.Router();

router.post(
  "/",
  auth,
  adminAuth,
  /**
   * @param {CreateUserRequest} req
   * @param {Response} res
   */
  async (req, res) => {
    const { username, password } = req.body;

    const { error } = validateUser({ username, password });

    if (error) {
      res.status(400).send({ error: error.details[0].message, errcode: 4 });
      return;
    }

    try {
      const user = await createUser(username, password);
      res.status(201).send({ user });
    } catch (err) {
      res.status(500).send({ error: "Internal server error", errcode: 7 });
    }
  },
);

router.get(
  "/",
  auth,
  adminAuth,
  /**
   * @param {Response} res
   */
  async (_, res) => {
    try {
      const users = await getUsers();
      res.send({ users });
    } catch (err) {
      res.status(500).send({ error: "Internal server error", errcode: 7 });
    }
  },
);

router.patch(
  "/password",
  auth,
  /**
   * @param {PasswordRequest} req
   * @param {Response} res
   */
  async (req, res) => {
    const { newPassword, oldPassword } = req.body;

    if (newPassword.trim() === "") {
      res
        .status(400)
        .send({ error: "New password cannot be empty", errcode: 8 });
      return;
    }

    const user = await getUser(req.user.username);

    if (!user) {
      res
        .status(400)
        .send({ error: "Incorrect username or password", errcode: 5 });
      return;
    }

    const validPassword = await isValidPassword(oldPassword, user.hash);

    if (!validPassword) {
      res
        .status(400)
        .send({ error: "Incorrect username or password", errcode: 5 });
      return;
    }

    await updatePassword(user, newPassword);

    res.send({});
  },
);

module.exports = router;
