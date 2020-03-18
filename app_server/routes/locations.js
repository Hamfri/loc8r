const express = require('express');
const router = express.Router();

const locationsController = require('../controllers/locations');

/* GET home page. */
router.get('/',locationsController.homeList);
router.get('/location',locationsController.locationInfo);
router.get('/location/review/new',locationsController.addReview);

module.exports = router;
