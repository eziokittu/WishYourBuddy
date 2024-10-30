const jwt = require('jsonwebtoken');
require('dotenv').config()
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
      throw new HttpError('Authentication failed! - '+err, 403);
    }

    // Validating the token
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);    

    // adding userData to request body
    req.userData = { userId: decodedToken.userId };
    
    next();
  } catch (err) {
    console.log('Authentication failed! - '+err);
    const error = new HttpError('Authentication failed! - '+err, 403);
    return next(error);
  }
};
