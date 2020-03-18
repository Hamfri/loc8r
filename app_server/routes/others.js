const express = require('express');
const router = express.Router();

const othersController = require('../controllers/others');

/* GET home page. */
router.get('/', othersController.about);

module.exports = router;
