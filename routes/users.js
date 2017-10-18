const express = require('express');
const models = require('../models')
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Register
router.get('/register', function(req, res){
  res.render('register');
});


// Working in progess will be moving this in the near future.
router.post('/register', function (req, res) {
  let agent = new models.Agent ({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    passwordVerify: req.body.password2
  })

  agent.save((err) => {
    if (err) {
        return res.send(err);
    }
  });
})

// Login
router.get('/login', function(req, res){
  res.render('login');
});

module.exports = router;
