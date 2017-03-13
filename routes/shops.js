var express = require('express');
var router = express.Router();
var mongoose = require('../modules/libs/mongoose')
var shops = require('../modules/models/shops')
/* GET home page. */
router.get('/anyutini', function(req, res, next) {
    shops.find({}).where('name').equals('anyutini').exec(function (err, items) {
        res.render('shops', { 'shops': items[0] });
    })
});
router.get('/magnolia', function(req, res, next) {
    shops.find({}).where('name').equals('magnolia').exec(function (err, items) {
        res.render('shops', { 'shops': items[0] });
    })
});
router.get('/veselovskogo', function(req, res, next) {
    shops.find({}).where('name').equals('veselovskogo').exec(function (err, items) {
        res.render('shops', { 'shops': items[0] });
    })
});
router.get('/kovalenko', function(req, res, next) {
    shops.find({}).where('name').equals('kovalenko').exec(function (err, items) {
        res.render('shops', { 'shops': items[0] });
    })
});
router.get('/kosareva', function(req, res, next) {
    shops.find({}).where('name').equals('kosareva').exec(function (err, items) {
        res.render('shops', { 'shops': items[0] });
    })
});
router.get('/dionis', function(req, res, next) {
    shops.find({}).where('name').equals('dionis').exec(function (err, items) {
        res.render('shops', { 'shops': items[0] });
    })
});
router.get('/chaika', function(req, res, next) {
    shops.find({}).where('name').equals('chaika').exec(function (err, items) {
        res.render('shops', { 'shops': items[0] });
    })
});
router.get('/polezhaeva', function(req, res, next) {
    shops.find({}).where('name').equals('polezhaeva').exec(function (err, items) {
        res.render('shops', { 'shops': items[0] });
    })
});
router.get('/gagarina', function(req, res, next) {
    shops.find({}).where('name').equals('gagarina').exec(function (err, items) {
        res.render('shops', { 'shops': items[0] });
    })
});
router.get('/lenina', function(req, res, next) {
    shops.find({}).where('name').equals('lenina').exec(function (err, items) {
        res.render('shops', { 'shops': items[0] });
    })
});
router.get('/kosmos', function(req, res, next) {
    shops.find({}).where('name').equals('kosmos').exec(function (err, items) {
        res.render('shops', { 'shops': items[0] });
    })
});


module.exports = router;
