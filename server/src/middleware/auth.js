const jwt = require("jsonwebtoken");
const { isAdmin } = require("../models/user");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).send({ error: "Unauthorized", errcode: 1 });
    return;
  }

  try {
    const tokenData = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = tokenData;
    next();
  } catch (err) {
    res.status(400).send({ error: "Invalid token", errcode: 2 });
  }
}

function adminAuth(req, res, next) {
  if (!isAdmin(req.user.username)) {
    res.status(403).send({ error: "Forbidden", errcode: 3 });
    return;
  }

  next();
}

module.exports = { auth, adminAuth };
