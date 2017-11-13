const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const listingController = require('../controllers/listingController');
const imageUploadController = require('../controllers/imageUploadController');
const queriesController = require('../controllers/queriesController');


router.get('/', authController.isAuthenticated, function (request, response, next) {
    response.render('listing');
});

router.post('/create', listingController.createListing);

router.post('/', function (request, response, next) {
    imageUploadController.upload(request, response);
    next()
}, function (request, response, next) {
    queriesController.displayImages(request, response);
});

module.exports = router;
