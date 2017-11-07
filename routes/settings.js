const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');


/* GET home page. */
router.get('/', settingsController.loadInfo);

router.post('/cancel', settingsController.loadInfo);

router.post('/delete', function(request, response) {
    request.flash('success_msg', 'Account was deleted successfully');
    response.redirect('/login')
});

router.post('/save', settingsController.modify);

module.exports = router;
