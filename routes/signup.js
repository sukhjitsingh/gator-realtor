const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

// Render Signup Page
router.get('/', function(req, res){
    res.render('signup');
});

// Signup Page

router.post('/create', registerController.create);
// router.post('/create', userController.create);


// Redirect Signin Page
router.post('/', function(req, res){
    res.redirect('/login');
});

module.exports = router;
