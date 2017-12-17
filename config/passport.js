const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const models = require('../models');

module.exports = (passport) => {
    // Local Strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            // Match Username
            models.User.findOne({
                where: {
                    email: email
                }
            }).then((user, err) => {
                if (err) {
                    return done(null, false);
                }
                if (user === null) {
                    return done(null, false, {message: 'No user found'});
                }
                // Match Password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Wrong password'});
                    }
                });
            });
        }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        models.User.findById(id).then((user) => {
            done(null, user);
        }).catch((err) => {
            if (err) {
                throw err;
            }
        });
    });
};