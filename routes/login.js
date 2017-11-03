const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

// Render Lognin Page
router.get('/', function(request, response, next) {
    response.render('login')
});

// Lognin Page
router.post('/login', function(req, res){
    res.render('login');
});

// Redirect to Dashboard Page
router.post('/signin', function(req, res) {
    res.redirect('/dashboard')
});

// Redirect to Dashboard Page
router.post('/signup', function(req, res) {
    res.redirect('/signup')
});

// Redirect to Homepage (Cancel Button )
router.post('/', function(req, res) {
    res.redirect('/')
})
module.exports = router;


