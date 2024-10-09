const jwt = require("jsonwebtoken");
const HTTP401Error = require("../utils/Http401Error");

const verfiyUserToken = (req, res, next) => {
  const authorizationHeader = req.header("Authorization");
  const token = authorizationHeader.split(" ")[1];
  if (!token) throw new HTTP401Error();
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (req.query.userId != decoded.userId) throw new HTTP401Error();
    next();
  } catch (error) {
    throw new HTTP401Error(true);
  }
};

module.exports = verfiyUserToken;
