// npm packages
const express = require('express');
const router = express.Router();

// local packages
const authController = require('../controllers/authController');
const settingsController = require('../controllers/settingsController');


/* GET home page. */
router.get('/', authController.isAuthenticated, settingsController.loadInfo);

router.post('/cancel', settingsController.loadInfo);

router.post('/delete', settingsController.deleteAccount);

router.post('/save', settingsController.modify);

module.exports = router;
