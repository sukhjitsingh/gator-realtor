const express = require('express');
const router = express.Router();
const listingDetailsController = require('../controllers/listingDetailsController');


router.post('/', listingDetailsController.displayListing);

router.post('/contact', listingDetailsController.saveMessage );

module.exports = router;
