var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.hbs', { title: 'Express' });
});


// Register
router.get('/register', function(req, res){
    res.render('register.hbs');
});

// Login
router.get('/login', function(req, res){
    res.render('login.hbs');
});

module.exports = router;
