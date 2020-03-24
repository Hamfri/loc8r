const express = require('express');
const router = express.Router();

const locationsController = require('../controllers/locations');

/* GET home page. */
router.get('/',locationsController.homeList);
router.get('/location/:locationId',locationsController.locationInfo);
router
    .route('/location/:locationId/review/new')
    .get(locationsController.addReview)
    .post(locationsController.doAddReview);

module.exports = router;
