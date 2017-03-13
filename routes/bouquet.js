var express = require('express');
var router = express.Router();
var mongoose = require('../modules/libs/mongoose')
var bouquet = require('../modules/models/bouquet')
/* GET home page. */
router.get('/wedding', function(req, res, next) {
    bouquet.find({}).exec(function (err, items) {
        res.render('bouquet', { 'bouquet': items[0] });
    });
});
router.get('/birthday', function(req, res, next) {
    bouquet.find({}, function (err, items) {
        res.render('bouquet', { 'bouquet': items[1] });
    })
});
router.get('/valentin', function(req, res, next) {
    bouquet.find({}, function (err, items) {
        res.render('bouquet', { 'bouquet': items[2] });
    })
});
router.get('/holiday', function(req, res, next) {
    bouquet.find({}, function (err, items) {
        res.render('bouquet', { 'bouquet': items[3] });
    })
});

module.exports = router;
