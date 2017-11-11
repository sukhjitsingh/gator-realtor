const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Render Login Page
router.get('/', function(request, response, next) {
    response.render('login')
});

router.post('/signin', loginController.login);

// Redirect to Dashboard Page
router.post('/signup', function(req, res) {
    res.redirect('/signup')
});

// Redirect to Homepage (Cancel Button )
router.post('/', function(req, res) {
    res.redirect('/')
});

module.exports = router;


