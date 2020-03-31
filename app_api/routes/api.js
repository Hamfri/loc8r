const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

const authenticationRequired = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

const locationController = require('../controllers/location');
const reviewsController = require('../controllers/reviews.js');
const usersController = require('../controllers/user.js');

// locations
router
    .route('/locations')
    .get(locationController.locationsListByDistance)
    .post(authenticationRequired, locationController.locationsCreate);

router
    .route('/locations/:locationId')
    .get(locationController.locationsReadOne)
    .put(authenticationRequired, locationController.locationsUpdateOne)
    .delete(authenticationRequired,locationController.locationsDeleteOne);


// reviews
router
    .route('/locations/:locationId/reviews')
    .post(authenticationRequired, reviewsController.reviewsCreate);

router
    .route('/locations/:locationId/reviews/:reviewId')
    .get(reviewsController.reviewsReadOne)
    .put(authenticationRequired, reviewsController.reviewsUpdateOne)
    .delete(authenticationRequired, reviewsController.reviewsDeleteOne);


// users
router.post('/authentication/register', usersController.register);
router.post('/authentication/login', usersController.login);

module.exports = router;

