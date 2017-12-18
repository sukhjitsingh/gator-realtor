const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const listingController = require('../controllers/listingController');
const imageUploadController = require('../controllers/imageUploadController');
const queriesController = require('../controllers/queriesController');

router.get('/', authController.isAuthenticated, (req, res) => {
    queriesController.getUser(req.user.id)
        .then(user => {
            if (user[0].agent === 1) {
                res.render('listing');
            } else {
                res.redirect('/')
            }
        })
    res.title('Create Listing')
});

router.post('/photos', listingController.createListing);

router.post('/finish', listingController.finishCreate);

router.post('/interrupt', listingController.cancelCreation);

router.post('/cancel', (request, response) => {
    response.redirect('/dashboard');
});

router.post('/upload', imageUploadController.upload);

module.exports = router;
