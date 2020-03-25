LocationModel = require('../models/locations');

const locationsListByDistance = async(req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const near = {
        type: 'Point',
        coordinates: [lng, lat]
    };
    const geoOptions = {
        distanceField: "distance.calculated",
        key: 'coords',
        spherical: true,
        maxDistance: 20000,
        limit: 10
    };
    if ((!lng && lng !== 0) || (!lat && lat !== 0)){
        return res
            .status(404)
            .json({
                "message": "lng and lat query parameters are required."
            });
    }
    try {
        const results = await LocationModel.aggregate([
            {
                $geoNear: {
                    near,
                    ...geoOptions
                }
            }
        ]);
        const locations = results.map(result => {
            return {
                id: result._id,
                name: result.name,
                address: result.address,
                rating: result.rating,
                facilities: result.facilities,
                distance: formatDistance(result.distance.calculated)
            }
        });
        res
            .status(200)
            .json(locations);
    }
    catch (err) {
        res
            .status(404)
            .json(err);
    }
};

const formatDistance = (distance) => {
    let thisDistance = 0;
    let unit = 'm';
    if(distance > 1000){
        thisDistance = parseFloat(distance / 1000).toFixed(2);
        unit = 'km'
    }
    else {
        thisDistance = Math.floor(distance).toString();
    }
    return `${thisDistance} ${unit}`;
}


const locationsCreate = (req, res) => {
    LocationModel.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities,
        coords: {
            type: "Point",
            coordinates: [
                parseFloat(req.body.coords.lng),
                parseFloat(req.body.coords.lat)
            ]
        },
        openingTimes: req.body.openingTimes
    },
    (err, location) => {
        if (err){
            res
                .status(400)
                .json(err)
        }
        else{
            res
                .status(201)
                .json(location)
        }
    });
};

const locationsReadOne = (req, res) => {
    LocationModel
        .findById(req.params.locationId)
        .exec((err, location) => {
            if (!location){
                return res
                    .status(404)
                    .json({
                        "message": "Location not found"
                    });
            }
            else if (err){
                return res
                    .status(404)
                    .json(err)
            }
            else {
                return res
                    .status(200)
                    .json(location);
            }
        });
};

const locationsUpdateOne = (req, res) => {
    if(!req.params.locationId){
        return res
            .status(404)
            .json({
                "message": "Not found, locationId is required."
            });
    }
    LocationModel
        .findById(req.params.locationId)
        .select('-reviews -rating')
        .exec((err, location) => {
            if (!location){
                return res
                    .json(404)
                    .status({
                        "message": "locationid not found"
                    });
            }
            else if (err){
                return res
                    .status(400)
                    .json(err);
            }
            location.name = req.body.name;
            location.address = req.body.address;
            location.facilities = req.body.facilities;
            location.coords = {
                type: "Point",
                coordinates: [
                    parseFloat(req.body.coords.lng),
                    parseFloat(req.body.coords.lat)
                ]
            };
            location.openingTimes = req.body.openingTimes;
            location.save((err, location) => {
                if(err){
                    res
                        .status(404)
                        .json(err);
                }
                else{
                    res
                        .status(200)
                        .json(location);
                }
            });
        });
};

const locationsDeleteOne = (req, res) => {
    const {locationId} = req.params;
    if(locationId){
        LocationModel
            .findByIdAndRemove(locationId)
            .exec((err, location) => {
                if(err){
                    return res
                        .status(404)
                        .json(err);
                }
                res
                    .status(204)
                    .json(null);
            });
    }
    else{
        res
            .status(404)
            .json({
                "message": "No location"
            })
    }
};

module.exports = {
    locationsListByDistance,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
};