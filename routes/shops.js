var express = require('express');
var router = express.Router();
var mongoose = require('../modules/libs/mongoose')
var shops = require('../modules/models/shops')
/* GET home page. */
router.get('/anyutini', function(req, res, next) {
    shops.find({}, function (err, items) {
        res.render('shops', { 'shops': items[0] });
    })
});
router.get('/magnolia', function(req, res, next) {
    shops.find({}, function (err, items) {
        res.render('shops', { 'shops': items[1] });
    })
});
router.get('/veselovskogo', function(req, res, next) {
    shops.find({}, function (err, items) {
        res.render('shops', { 'shops': items[2] });
    })
});
router.get('/kovalenko', function(req, res, next) {
    shops.find({}, function (err, items) {
        res.render('shops', { 'shops': items[3] });
    })
});
router.get('/nevod', function(req, res, next) {
    shops.find({}, function (err, items) {
        res.render('shops', { 'shops': items[4] });
    })
});
router.get('/dionis', function(req, res, next) {
    shops.find({}, function (err, items) {
        res.render('shops', { 'shops': items[5] });
    })
});
router.get('/chaika', function(req, res, next) {
    shops.find({}, function (err, items) {
        res.render('shops', { 'shops': items[6] });
    })
});
router.get('/polezhaeva', function(req, res, next) {
    shops.find({}, function (err, items) {
        res.render('shops', { 'shops': items[7] });
    })
});
router.get('/gagarina', function(req, res, next) {
    shops.find({}, function (err, items) {
        res.render('shops', { 'shops': items[8] });
    })
});
router.get('/lenina', function(req, res, next) {
    shops.find({}, function (err, items) {
        res.render('shops', { 'shops': items[9] });
    })
});
router.get('/kosmos', function(req, res, next) {
    shops.find({}, function (err, items) {
        res.render('shops', { 'shops': items[10] });
    })
});


module.exports = router;
