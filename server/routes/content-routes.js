const express = require('express');
const { check } = require('express-validator');
const contentController = require('../controller/content-controller');
const checkAuth = require('../middlewares/check-auth');
const router = express.Router();

// GET Routes
router.get(
  '/get/colour/',
  contentController.getColours
);
router.get(
  '/get/colour/:cid',
  contentController.getColour
);

// Added middleware to check if authentication token is VALID
// router.use(checkAuth);

// POST Routes
router.post(
  '/post/colour',
  check('name')
    .not()
    .isEmpty(),
  contentController.addColour
);

router.post(
  '/post/colours',
  contentController.addColours
)

// DELETE Routes

router.delete(
  '/delete/colour',
  contentController.deleteColourByName
)

module.exports = router;