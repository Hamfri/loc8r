const request = require('request');
const apiOptions = {
    server: 'http://localhost:3030',
    mapsApiKey: ''
};
if (process.NODE_ENV === 'production'){
    apiOptions.server = 'https://loc8r-hamfri.herokuapp.com';
    apiOptions.mapsApiKey = process.MAPS_API_KEY

};
/**
 * GET 'home' page
 */
const homeList = (req, res) => {
    const path = '/api/locations';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        qs: {
            lng: 11.0528,
            lat: 50.999,
            maxDistance: 20
        }
    };
    request(
        requestOptions,
        (err, {statusCode}, body) => {
            let data = [];
            if (!err && statusCode === 200 && body.length){
                // Map enables looping over all the data
                data = body.map((item) => {
                    // Here you can manipulate the returned data
                    return item;
                });
            }
            else if(statusCode === 404){
                // force data to be an empty object
                data = {};
            }
            renderHomepage(req, res, data);
        });
};

const renderHomepage = (req, res, responseBody) => {
    let message = null;
    if (!(responseBody instanceof Array)){
        message = "Api lookup error";
        responseBody = [];
    }
    else {
        if(!responseBody.length){
            message = "No places found nearby";
        }
    }
    res.render('locations-list', {
        title: 'Home',
        pageHeader: {
            title: 'Loc8r',
            strapLine: 'Find places to work with wifi near you!'
        },
        sidebar: `Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.`,
        locations: responseBody,
        message
    });
};

/**
 * GET 'Location info' page 
 */
const locationInfo = (req, res) => {
    getLocationInfo(req, res,
        (req, res, responseData) => renderInfoPage(req, res, responseData)
    );
};

const showError = (req, res, status) => {
    let title = '';
    let content = '';
    if(status === 404) {
        title = '404, page not found.',
        content = `Oops! Page not found. Sorry.`;
    }
    else{
        title = `${status}, something's gone wrong`;
        content = 'Oops! Looks like something is wrong somewhere. Please try again later.'
    }
    res.status(status);
    res.render('generic-text', { title, content });
};

const renderInfoPage = (req, res, location) => {
    res.render('location-info', 
    {
        title: 'Location info',
        pageHeader: {
            title: 'Loc8r'
        },
        sidebar:{
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location,
        mapsApiKey: apiOptions.mapsApiKey
    }
    );
};

const getLocationInfo = (req, res, callback) => {
    const path = `/api/locations/${req.params.locationId}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, {statusCode}, body) => {
            let data = body;
            if (statusCode === 200){
                data.coords = {
                    lng: body.coords[0],
                    lat: body.coords[1]
                };
                // invoke a callback instead of a named function
                callback(req, res, data);
            }
            else {
                showError(req, res, statusCode);
            }
        }
    );
};

/**
 * GET 'Add review' page
 */
 const addReview = (req, res) => {
     getLocationInfo(req, res,
        (req, res, responseData) => renderReviewForm(req, res, responseData)
    );
 };

 const renderReviewForm = (req, res, {name}) => {
     res.render('location-review-form', {
         title: `Review ${name} on Loc8r`,
         pageHeader: { title: `Review ${name}`},
         error: req.query.err
     });
 };

 const doAddReview = (req, res) => {
     const locationId = req.params.locationId;
     const path = `/api/locations/${locationId}/reviews`;
     const postData = {
         author: req.body.name,
         rating: parseInt(req.body.rating, 10),
         reviewText: req.body.review
     };
     const requestOptions = {
         url: `${apiOptions.server}${path}`,
         method: 'POST',
         json: postData
     };
     if(!postData.author || !postData.rating || !postData.reviewText){
         res.redirect(`/location/${locationId}/review/new/?err=val`);
     }
     else {
        request(
            requestOptions,
            (err, {statusCode}, {name}) => {
                console.log(statusCode);
                if (statusCode === 201){
                    res.redirect(`/location/${locationId}`);
                }
                else if(statusCode === 400 && name && name === 'ValidationError'){
                    res.redirect(`/location/${locationId}/review/new?err=val`)
                }
                else {
                    console.log(body);
                    showError(req, res, statusCode);
                }
            }
        );
    }
};

 module.exports = {
     homeList,
     locationInfo,
     addReview,
     doAddReview
 };