const express = require('express');
const { check } = require('express-validator');
const userController = require('../controller/user-controller');
const router = express.Router();

router.post(
  '/signin',
  [
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  userController.signin
);
router.post('/login', userController.login);

module.exports = router;
