const express = require('express');
const { check } = require('express-validator');
const colourController = require('../controller/colour-controller');
const checkAuth = require('../middlewares/check-auth');
const router = express.Router();

// GET Routes
router.get(
  '/get/colour/',
  colourController.getColours
);
router.get(
  '/get/colour/:cid',
  colourController.getColour
);

// Added middleware to check if authentication token is VALID
router.use(checkAuth);

// POST Routes
router.post(
  '/post/colour',
  check('name')
    .not()
    .isEmpty(),
  colourController.addColour
);

router.post(
  '/post/colours',
  colourController.addColours
)

// DELETE Routes

router.delete(
  '/delete/colour',
  colourController.deleteColourByName
)

module.exports = router;