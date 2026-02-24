const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).send("Access denied. No token found.");
    return;
  }

  try {
    const tokenData = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = tokenData;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
