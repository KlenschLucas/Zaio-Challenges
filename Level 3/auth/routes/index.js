const User = require('../models/User');
const passport = require('passport');
/**
 * GET /login
 * Login page.
 */
exports.getLogin = (req, res) => {
    res.render('signin', {
        title: 'Login'
    });
};

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect(req.session.returnTo || '/');
        });
    })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) console.log('Error : Failed to destroy the session during logout.', err);
        req.user = null;
        res.redirect('/');
    });
};

/**
 * GET /signup
 * Signup page.
 */
exports.getSignup = (req, res) => {
    if (req.user) {
        return res.redirect('/profile');
    }
    res.render('signup', {
        title: 'Create Account'
    });
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = (req, res, next) => {

    if (req.body.password !== req.body.confirmpassword) {
        res.redirect('/signup');
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        degree: req.body.degree,
        fav: req.body.fav
    });
    User.findOne({email: req.body.email}, (err, existingUser) => {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.redirect('/');
        }
        user.save((err) => {
            if (err) {
                return next(err);
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
};

/**
 * GET /profile
 * Profile page.
 */
exports.getAccount = (req, res) => {
    res.render('profile', {
        title: 'Profile',
        user: req.user
    });
};
/**
 * GET /edit-profile
 * Profile page.
 */
exports.getAccountProfile = (req, res) => {
    res.render('edit-profile', {
        title: 'Edit Profile',
        user: req.user
    });
};

/**
 * POST /profile
 * Update profile information.
 */
exports.postUpdateProfile = (req, res, next) => {
    User.findById(req.user.id, (err, user) => {
        if (err) {
            return next(err);
        }
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.age = req.body.age;
        user.degree = req.body.degree;
        user.fav = req.body.fav;
        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    return res.redirect('/profile');
                }
                return next(err);
            }
            res.redirect('/profile');
        });
    });
};