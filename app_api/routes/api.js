const express = require('express');
const router = express.Router();

const locationController = require('../controllers/location');
const reviewsController = require('../controllers/reviews.js');

// locations
router
    .route('/locations')
    .get(locationController.locationsListByDistance)
    .post(locationController.locationsCreate);

router
    .route('/locations/:locationId')
    .get(locationController.locationsReadOne)
    .put(locationController.locationsUpdateOne)
    .delete(locationController.locationsDeleteOne);


// reviews
router
    .route('/locations/:locationId/reviews')
    .post(reviewsController.reviewsCreate);

router
    .route('/locations/:locationId/reviews/:reviewId')
    .get(reviewsController.reviewsReadOne)
    .put(reviewsController.reviewsUpdateOne)
    .delete(reviewsController.reviewsDeleteOne);

module.exports = router;

