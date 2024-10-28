const express = require('express');
const { check } = require('express-validator');
const userController = require('../controller/user-controller');
const router = express.Router();

// GET Routes
router.get(
  '/get/:username',
  userController.getUser
);

// POST Routes
router.post(
  '/signup',
  [
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  userController.signup
);
router.post('/login', userController.login);

// PATCH Routes
router.patch(
  '/patch/:uid',
  userController.updateUserInfo
);

module.exports = router;
