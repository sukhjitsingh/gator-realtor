const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const imageUploadController = require('../controllers/imageUploadController');
const queriesController = require('../controllers/queriesController');


router.get('/', function (req, res, next) {
    res.render('listing');
});

router.post('/create', listingController.createListing);

router.post('/', function (req, res, next) {
    imageUploadController.upload(req, res);
    next()
}, function (req, res, next) {
    queriesController.displayImages(req, res);
});

module.exports = router;
