const passport = require('passport');

module.exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/fa17g11/',
        failureRedirect: '/fa17g11/login',
        failureFlash: true
    })(req, res, next);
};
