const models = require('../models');
const bcrypt = require('bcryptjs');

module.exports.create = function (req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    let password = req.body.password;

    req.checkBody('firstName', 'first name is required').notEmpty();
    req.checkBody('lastName', ' last Name is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
    req.checkBody('password', 'password length must be minimum 8 characters').isLength(8, 20);
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(req.body.password);
    req.checkBody('inlineRadioOptions', 'Please select if are agent or user').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render('signup', {
            errors: errors
        });
    } else {
        let client;
        if(req.body.inlineRadioOptions === 'yes'){
             client = new models.Agent({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                password: password
            });
        } else {
             client = new models.User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                password: password
            });
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(client.password, salt, function (err, hash) {
                if (err) {
                    return res.send(err);
                }
                client.password = hash;
                req.flash('success_msg', 'You are registered and now can login');
                client.save((err) => {
                    if (err) {
                        return res.send(err);
                    } else {

                    }
                });
                return res.redirect('/login');
            });
        });
    }
};

