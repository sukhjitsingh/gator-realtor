var express = require('express');
var router = express.Router();

// Register
router.get('/register', function(req, res){
    res.render('register.hbs');
});

// Login
router.get('/login', function(req, res){
    res.render('login.hbs');
});

module.exports = router;
