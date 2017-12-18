const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

// Render Login Page
router.get('/', (request, response, next) => {
    response.title('About Us').render('aboutUs')
});



module.exports = router;
