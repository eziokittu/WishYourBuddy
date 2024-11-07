const express = require('express');
// const { check } = require('express-validator');
const pageController = require('../controller/page-controller');
const checkAuth = require('../middlewares/check-auth');
const router = express.Router();

// GET Routes
router.get(
  '/get/:userName/:pageName',
  pageController.getPage
);

// Added middleware to check if authentication token is VALID
// router.use(checkAuth);

// POST Routes
router.post(
  '/post/:userName',
  pageController.createPage
);

// DELETE Routes

router.delete(
  '/delete/:userName/:pageName',
  pageController.deletePage
)

module.exports = router;