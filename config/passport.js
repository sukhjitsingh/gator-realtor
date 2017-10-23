const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const models = require('../models');
const passport = require ('passport');


module.exports = function(passport){
    // Local Strategy
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField: 'passwdord',
    },
        function(req, username, password, done){
        // Match Username



        models.Agent.findOne({username:username}, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'No user found'});
            }

            // Match Password
            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Wrong password'});
                }
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        models.Agent.findById(id, function(err, user) {
            done(err, user);
        });
    });

}