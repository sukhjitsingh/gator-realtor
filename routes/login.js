const express = require('express');
const router = express.Router();
const agentController = require('../controller/agentController');


router.get('/', function(request, response, next) {
    response.render('login')
});


router.post('/register', function(req, res){
    res.render('register');
});


router.post('/submit', function(req, res) {

});

module.exports = router;


