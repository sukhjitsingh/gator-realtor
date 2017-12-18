const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const handlebarsIntl = require('handlebars-intl');
const handlebars = require('hbs');

const index = require('./routes/index');
const signup = require('./routes/signup');
const listing = require('./routes/listing');
const dashboard = require('./routes/dashboard');
const settings = require('./routes/settings');
const search = require('./routes/search');
const login = require('./routes/login');
const logout = require('./routes/logout');
const listingDetails = require('./routes/listingDetails');
const aboutUs = require('./routes/aboutUs');
const favorites = require('./routes/favorites');

const app = express();

//Setting Page Titles 
app.use(require('express-title')());
app.set('title', 'Gator Realtor');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
handlebarsIntl.registerWith(handlebars)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.set('trust proxy', 1);

app.use(flash());

//express validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        let namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Authentication
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: false,
    //cookie: {secure: true }
}));

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());


app.use(logger('dev'));

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/', index);
app.use('/signup', signup);
app.use('/search', search);
app.use('/listing', listing);
app.use('/dashboard', dashboard);
app.use('/settings', settings);
app.use('/login', login);
app.use('/logout', logout);
app.use('/listingDetails', listingDetails);
app.use('/aboutUs',aboutUs);
app.use('/favorites',favorites);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
