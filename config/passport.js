const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const models = require('../models');


module.exports = function(passport){
    // Local Strategy
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function(req, email, password, done){
        // Match Username
            console.log('EMAIL:', email)

            let query = {where: {passsword:password}};
            models.Agent.findOne({where: {email:email}}, function(err, user){
                if(err) throw err;
            if(!user){
                return done(null, false, {message: 'No user found'});
            }
                console.log('PASSWORD:', user.password)
            // Match Password
            bcrypt.compare(password, query, function(err, isMatch){
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
};