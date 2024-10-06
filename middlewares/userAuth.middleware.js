const jwt = require("jsonwebtoken");
const HTTP401Error = require("../utils/Http401Error");

const verfiyUserToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) throw new HTTP401Error();
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    throw new HTTP401Error(true);
  }
};

module.exports = verfiyUserToken;
