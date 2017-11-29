const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

// Render Login Page
router.get('/', (request, response, next) => {
    response.render('aboutUs')
});



module.exports = router;
