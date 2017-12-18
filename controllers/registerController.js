const models = require('../models');
const bcrypt = require('bcryptjs');
const queriesController = require('../controllers/queriesController');

module.exports.create = (req, res) => {
    let User;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    let password = req.body.password;
    let agent = 0;
    let agentId;
    if (req.body.inlineRadioOptions === 'yes') {
        agent = 1;
        agentId = req.body.phoneNumber;
    }

    req.checkBody('firstName', 'first name is required').notEmpty();
    req.checkBody('lastName', ' last Name is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
    req.checkBody('phoneNumber', 'phone number is not valid').notEmpty();
    req.checkBody('password', 'password length must be minimum 8 characters').isLength(8, 20);
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(req.body.password);
    req.checkBody('inlineRadioOptions', 'Please select if are agent or user').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        res.render('signup', {errors});
    } else {
        queriesController.isRegistered(email).then(user => {
            if (user.length !== 0) {
                req.flash('error', 'Account with such Email already exist, please choose different one');
                res.redirect('/fa17g11/signup');
            } else {
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(password, salt);

                User = new models.User({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phoneNumber: phoneNumber,
                        password: hash,
                        agent: agent,
                        agentId: agentId
                    }
                );
                User.save((err) => {
                    if (err) {
                        return res.send(err);
                    }
                });
                req.flash('success_msg', 'You are registered and now can login');
                return res.redirect('/fa17g11/login');
            }
        })
    }
};

