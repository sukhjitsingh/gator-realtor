const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const models = require('../models');
const queriesController = require('../controllers/queriesController');
let clientType;

module.exports = function (passport) {
    // Local Strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            // Match Username
            models.User.findOne({
                where: {
                    email: email
                }
            }).then(function (user, err) {
                if (err) {
                    return done(null, false);
                }
                if (user === null) {
                    return done(null, false, {message: 'No user found'});
                }
                // Match Password
                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        queriesController.setClientId(email);
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Wrong password'});
                    }
                });
            });
        }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};