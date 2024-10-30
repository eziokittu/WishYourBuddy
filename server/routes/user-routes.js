const express = require('express');
const { check } = require('express-validator');
const userController = require('../controller/user-controller');
const checkAuth = require('../middlewares/check-auth');
const router = express.Router();

// GET Routes
router.get(
  '/get/:username',
  userController.getUser
);

// POST Routes
router.post('/login', userController.login);

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

// Added middleware to check if authentication token is VALID
// router.use(checkAuth);

// PATCH Routes
router.patch(
  '/patch/:uid',
  userController.updateUserInfo
);

module.exports = router;
