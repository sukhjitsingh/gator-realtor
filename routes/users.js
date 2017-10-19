const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const passport = require('passport');
const models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Register
router.get('/register', function(req, res){
  res.render('register');
});

//login
router.get('/login', function(req, res){
    res.render('login');
});


// Working in progress will be moving this in the near future.
router.post('/register', function (req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    let password = req.body.password;

    req.checkBody('firstName', 'first name is required').notEmpty();
    req.checkBody('lastName', ' last Name is required').notEmpty();
    req.checkBody('email', 'email is required').isEmail();
    req.checkBody('phoneNumber', 'phone number is required').notEmpty().isLength(1,30);
    req.checkBody('password', 'password is required(must be minimum 8 characters)').notEmpty().isLength(8,20);
    req.checkBody('password2', 'Password do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
        res.render('register', {
            errors:errors
        });
    }else {
        var agent = new models.Agent({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: bcrypt.hashSync(password),
        });
        req.flash('success_msg', 'You are registered and now can login');
        res.redirect('login');


        agent.save((err) => {
            if (err) {
                //return res.send(err);
            }
        });
    }
});

router.post('/login',
    passport.authenticate('local', {successRedirect:'/',
            failureRedirect:'/users/login',
            failureFlash: true}),
    function(req, res) {
        res.redirect('/');
    });

// logout
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/users/login');
});

module.exports = router;
