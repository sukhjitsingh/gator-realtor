const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

// Render Login Page
router.get('/', (request, response, next) => {
    response.render('login')
});

router.post('/signin', loginController.login);

// Redirect to Dashboard Page via signup button
router.post('/signup', (request, response) => {
    response.redirect('/signup')
});

// Redirect to Homepage (Cancel Button )
router.post('/', (request, response) =>{
    response.redirect('/')
});

module.exports = router;


