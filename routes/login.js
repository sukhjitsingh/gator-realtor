const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

// Render Login Page
router.get('/', function(request, response, next) {
    response.render('login')
});

// Redirect to Dashboard Page
// router.post('/signin', function(req, res) {
//     res.redirect('/dashboard')
// });
router.post('/signin', agentController.login);

// Redirect to Dashboard Page
router.post('/signup', function(req, res) {
    res.redirect('/signup')
});

// Redirect to Homepage (Cancel Button )
router.post('/', function(req, res) {
    res.redirect('/')
})
module.exports = router;


