const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');

router.get('/', function (req, res, next) {
    res.render('listing');
});

router.post('/', listingController.createListing);

module.exports = router;
