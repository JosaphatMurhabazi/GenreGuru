require('dotenv').config();
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  } catch (e) {
    res.status(403).json('Invalid token.');
  }
};
