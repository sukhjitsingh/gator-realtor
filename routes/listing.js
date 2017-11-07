const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const uploadController = require('../controllers/uploadController');
const searchController = require('../controllers/searchController');


router.get('/', function (req, res, next) {
    res.render('listing');
});

router.post('/create', listingController.createListing);

router.post('/', function (req, res, next) {
    uploadController.upload(req, res);
    next()
}, function (req, res, next) {
    searchController.displayImages(req, res);
});

module.exports = router;
