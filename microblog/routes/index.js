var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');

/* GET home page. */

router.get('/', checkNotLogin);
router.get('/', function (req, res) {
    res.render('index', {
        title: 'HomePage',
        user: req.session.user,
        //success: req.flash('success').toString(),
        //error: req.flash('error').toString()
    });
});

router.get('/u/:user', function (req, res) {
    res.send('JUST FOR YOU');
});

router.post('/post', function (req, res) {

});

router.get('/reg', checkNotLogin);
router.get('/reg', function (req, res) {
    res.render('reg', {
        title: 'User Register',
    });

});


router.post('/reg', checkNotLogin);
router.post('/reg', function (req, res) {
    if (req.body['password-repeat'].length == 0 || req.body['password'].length == 0 || req.body['username'].length == 0) {
        req.flash('error', 'content is null');
        return res.redirect('/reg');
    }

    if (req.body['password-repeat'] != req.body['password']) {
        req.flash('error', 'passwords are inconsistent');
        return res.redirect('/reg');
    }

    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name: req.body.username,
        password: password,
    });

    User.get(newUser.name, function (err, user) {
        if (user) {
            err = 'Username already exists.';
        }

        if (err) {
            req.flash('error', err);
            return res.redirect('/reg');
        }

        newUser.save(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }
            req.session.user = newUser;
            req.flash('success', 'Register successfully');
            res.redirect('/');
        });
    });
});

router.get('/login', checkNotLogin);
router.get('/login', function (req, res) {
    res.render('login', {title: 'Login'});

});

router.post('/login', checkNotLogin);
router.post('/login', function (req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username, function (err, user) {
        if (!user) {
            req.flash('error', 'use isn\'t exist');
            return res.redirect('/login');
        }

        if (user.password != password) {
            req.flash('error', 'password is incorrect');
            return res.redirect('/login');
        }

        req.session.user = user;
        req.flash('success', 'Login Successfully');
        res.redirect('/');
    });

});

router.get('/logout', checkLogin);
router.get('/logout', function (req, res) {
    req.session.user = null;
    req.flash('success', 'Logout successfully');
    res.redirect('/');

});

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', 'Hasnot login');
        return res.redirect('/login');
    }

    next();
}

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', 'Have Logged');
        return res.redirect('/');
    }

    next();
}


module.exports = router;
