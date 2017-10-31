const express = require('express');
const router = express.Router();
const settingsController = require('../controller/settingsController');


/* GET home page. */
router.get('/', function(request, response) {
    response.render('accountSettings')
});

router.post('/cancel', function(request, response) {
    response.render('accountSettings')
});

router.post('/delete', function(request, response) {
    request.flash('success_msg', 'Account was deleted successfully');
    return response.redirect('/login')
});

router.post('/save', settingsController.modify);

module.exports = router;
