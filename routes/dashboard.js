const queriesController = require('../controllers/queriesController');

// npm packages
const express = require('express');
const router = express.Router();

// local packages
const authController = require('../controllers/authController');
const dashboardController = require('../controllers/dashboardController');
const listingDetailsController = require('../controllers/listingDetailsController');


/* GET home page. */
router.get('/', authController.isAuthenticated, (req, res, next) => {

    queriesController.getUser(req.user.id)
        .then(user => {
            if (user[0].agent === 1) {
                dashboardController.displayDashboardProperties(req, res)
            } else {
                res.redirect('/')
            }
        })
});
router.post('/sort', dashboardController.displayDashboardProperties);
router.post('/delete', dashboardController.deleteProperty);
router.post('/listing/:id', listingDetailsController.displayListing);

module.exports = router;
