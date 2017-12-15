const express = require('express');
const router = express.Router();
const listingDetailsController = require('../controllers/listingDetailsController');

router.get('/:id', listingDetailsController.displayListing);

router.post('/:id', listingDetailsController.displayListing);

router.post('/contact/:id', listingDetailsController.saveMessage );

router.post('/favorites/:id', listingDetailsController.addToFavorites);


module.exports = router;
