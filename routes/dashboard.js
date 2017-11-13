// npm packages
const express = require('express');
const router = express.Router();

// local packages
const authController = require('../controllers/authController');
const dashboardController = require('../controllers/dashboardController');
const listingDetailsController = require('../controllers/listingDetailsController');


/* GET home page. */
router.get('/', authController.isAuthenticated, dashboardController.displayDashboardProperties);

router.post('/delete', dashboardController.deleteProperty);
router.post('/edit', dashboardController.displayDashboardProperties);
router.post('/listing/:id', listingDetailsController.displayListing);


module.exports = router;
