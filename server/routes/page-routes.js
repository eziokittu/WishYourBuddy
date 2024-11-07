const express = require('express');
// const { check } = require('express-validator');
const pageController = require('../controller/page-controller');
const checkAuth = require('../middlewares/check-auth');
const router = express.Router();

// GET Routes
router.get(
  '/get/:userName/page/:pageName',
  pageController.getPage
);

router.get(
  '/get/:userName/pagenames',
  pageController.getPageNames
);

router.get(
  '/get/:userName/pages',
  pageController.getPages
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