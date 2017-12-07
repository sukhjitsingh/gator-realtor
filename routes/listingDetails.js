const express = require('express');
const router = express.Router();
const listingDetailsController = require('../controllers/listingDetailsController');

router.get('/:id', listingDetailsController.displayListing);

router.post('/:id', listingDetailsController.displayListing);

router.post('/contact', listingDetailsController.saveMessage );

module.exports = router;
