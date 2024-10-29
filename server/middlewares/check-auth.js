const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {

  // This line is to allow routes present before the checkauth() middleware
  if (req.method === 'OPTIONS') {
    return next();
  }

  // validating the authorization token
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }

    // Validating the token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    // adding userData to request body
    req.userData = { userId: decodedToken.userId, isAdmin: decodedToken.isAdmin };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
