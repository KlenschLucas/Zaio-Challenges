const express = require('express');
const router = express.Router();
const crypto = require('crypto');
var db = require('../db');


/* GET Signin page. */
router.get('/', function (req, res) {
    res.render('signin', {title: 'Sign', error: '', message: ''});
});

/* Signin */
router.post('/', function (req, res) {
    let error = 'Email or Password not correct';
    let email = req.body.email;
    let hash = crypto.createHash('sha256').update(req.body.password).digest('hex');
    console.log(hash);
    res.render('signin', {title: 'Signin', error: error, message: ''});
    res.render('profile', {title: 'Signin'});
});

/* GET Signup page */
router.get('/signup', function (req, res) {
    res.render('signup', {title: 'Signin', message: 'You can now login'});
});

/* Signup */
router.post('/signup', function (req, res) {
    console.log(req.body.name);
    res.render('signup', {title: 'Signin', message: 'You can now login'});
});

router.get('/profile', function (req, res) {
    let user = {
        name: 'Klensch',
        surname: 'Lucas',
        email: 'klensch.lucas@gmail.com',
        age: 21
    };
    res.render('profile', {title: 'Profile', error: '', message: '', user: user});
});
router.get('/edit-profile', function (req, res) {
    let user = {
        name: 'Klensch',
        surname: 'Lucas',
        email: 'klensch.lucas@gmail.com',
        age: 21
    };
    res.render('edit-profile', {title: 'Edit Profile', message: '', user: user});
});

router.post('/profile', function (req, res) {
    let user = {
        name: 'Klensch',
        surname: 'Lucas',
        email: 'klensch.lucas@gmail.com',
        age: 21
    };
    res.render('profile', {title: 'Edit Profile', user: user, error: '', message: ''});
});

module.exports = router;
