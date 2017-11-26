const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const listingController = require('../controllers/listingController');
const imageUploadController = require('../controllers/imageUploadController');

router.get('/', authController.isAuthenticated,  (request, response, next) => {
    response.render('listing');
});

router.post('/photos', listingController.createListing);

router.post('/cancel', (request, response)=>{
    response.redirect('/dashboard');
});

router.post('/upload', imageUploadController.upload);

module.exports = router;
