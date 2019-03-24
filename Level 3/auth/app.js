/**
 * Module dependencies.
 */
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');

/**
 * Controllers (route handlers).
 */
const controller = require('./routes/index');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://zaio-writer:qwerty123@ds139775.mlab.com:39775/zaio-profile');
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'This-is-my-secret',
    cookie: {maxAge: 1209600000}, // two weeks in milliseconds
    store: new MongoStore({
        url: 'mongodb://zaio-writer:qwerty123@ds139775.mlab.com:39775/zaio-profile',
        autoReconnect: true,
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    // After successful login, redirect back to the intended page
    if (!req.user
        && req.path !== '/login'
        && req.path !== '/signup'
        && !req.path.match(/^\/auth/)
        && !req.path.match(/\./)) {
        req.session.returnTo = req.originalUrl;
    } else if (req.user
        && (req.path === '/profile' || req.path.match(/^\/api/))) {
        req.session.returnTo = req.originalUrl;
    }
    next();
});
app.use('/', express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));

/**
 * Primary app routes.
 */
app.get('/', controller.getLogin);
app.post('/', controller.postLogin);
app.get('/logout', controller.logout);
app.get('/signup', controller.getSignup);
app.post('/signup', controller.postSignup);
app.get('/profile', passportConfig.isAuthenticated, controller.getAccount);
app.get('/edit-profile', passportConfig.isAuthenticated, controller.getAccountProfile);
app.post('/profile', passportConfig.isAuthenticated, controller.postUpdateProfile);

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorHandler());
} else {
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).send('Server Error');
    });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;