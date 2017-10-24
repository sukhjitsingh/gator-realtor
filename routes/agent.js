const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const models = require('../models');

// Register Page
router.get('/register', function(req, res){
    res.render('register');
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
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
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
            password: password
        });

        bcrypt.genSalt(10, function (err, salt){
            bcrypt.hash(agent.password, salt, function (err, hash) {
                if(err){
                    return res.send(err);
                }
                agent.password = hash;
                req.flash('success_msg', 'You are registered and now can login');
                res.redirect('login');
                agent.save((err) => {
                    if (err) {
                         return res.send(err);
                    } else{

                    }
                });
            });
        });
    }
});

//login
router.get('/login', function(req, res){
    res.render('login');
});

router.post('/login',function(req, res, next){
    passport.authenticate('local', {
            successRedirect:'dashboard',
            failureRedirect:'login',
            failureFlash: true
    })(req, res, next);
});

// logout
router.get ('/logout', function(req, res){
    req.logout();
    req.flash('success_msg', ' You are logged out');
    res.redirect('login');
});

module.exports = router;
