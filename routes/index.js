var express = require('express');
var router = express.Router();
var mongoose = require('../modules/libs/mongoose');
var flowers = require('../modules/models/flowers');
var bouquet = require('../modules/models/bouquet');
var shops = require('../modules/models/shops');
var user = require('../modules/models/user');
var session = require('express-session');

var config = require('../config.json');

// =================
var app = require('express')(),
    mailer = require('express-mailer');
mailer.extend(app, {
    from: 'ferguse@yandex.ru',
    host: 'smtp.yandex.ru', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: 'ferguse@yandex.ru',
        pass: 'sp0rtlife'
    }
});
//=====================================

/* GET home page. */

router.get('/', function (req, res, next) {

    // function getRand(max, min) {
    //     var result = Math.random() * (max - min) + min;
    //     return Math.ceil(result)
    // }

    flowers.find({}).exec(function (err, items) {
        if (err) throw err;
        res.render('index', {'flowers': items/*, random: getRand(0,items.length)*/});
    });
});

router.get('/getflowers', function (req, res, next) {
    flowers.find({}).exec(function (err, flowers) {
        if (err) throw err;
        res.send(flowers);
    });
});

router.get('/getbouquet', function (req, res, next) {

    bouquet.find({}).find(function (err, bouquet) {
        if (err) throw err;
        res.send(bouquet);
    });
});

router.get('/getshops', function (req, res, next) {
    shops.find({}).exec(function (err, shops) {
        if (err) throw err;
        res.send(shops);
    });
});
router.get('/sendmessage', function (req, res, next) {
    console.log(app.mailer)

    try {
        app.mailer.send('test', {
            to: 'a.a.ivchenko@gmail.com',
            subject: 'TEST'
        }, function (err) {
            if (err) {
                console.log(err);
                res.status(400).json('There was an error sending the email');
            } else {
                res.status(200).json('Email Sent');
            }
        });
    } catch (error) {
        //Error is raised here
        res.status(500).json(error);
    }
});

router.post('/login', function (req, res, next) {
    user.findOne({'username': 'admin'}).exec(function (err, user) {
        if (err) throw err;
        if (req.body.pass === user.password) {
            req.session.auth = 'true';
            req.session.user = user._id;
            req.session.save(function(err) {
                console.log("Session Before Redirect: ", req.session);
                res.send('/admin');
            })

        }
    });
});
router.get('/admin', function (req, res, next) {
    user.findOne({'username': 'admin'}).exec(function (err, user) {
        if (err) throw err;
        console.log(req.session.auth);
        if (req.session.auth !== 'true') {
            res.redirect('/');
        } else {
            res.render('admin', function (err) {

            });
        }
    });
});
module.exports = router;
