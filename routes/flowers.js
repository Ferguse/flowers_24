var express = require('express');
var router = express.Router();
var mongoose = require('../modules/libs/mongoose')
var flowers = require('../modules/models/flowers')
/* GET home page. */
router.get('/roses', function(req, res, next) {
    flowers.find({}, function (err, items) {
        res.render('flowers', { 'flowers': items[0] });
    })
});
router.get('/chrysantems', function(req, res, next) {
    flowers.find({}, function (err, items) {
        res.render('flowers', { 'flowers': items[1] });
    })
});
router.get('/tulpans', function(req, res, next) {
    flowers.find({}, function (err, items) {
        res.render('flowers', { 'flowers': items[2] });
    })
});
router.get('/carnations', function(req, res, next) {
    flowers.find({}, function (err, items) {
        res.render('flowers', { 'flowers': items[3] });
    })
});
router.get('/other', function(req, res, next) {
    flowers.find({}, function (err, items) {
        res.render('flowers', { 'flowers': items[4] });
    })
});
router.get('/gorshki', function(req, res, next) {
    flowers.find({}, function (err, items) {
        res.render('flowers', { 'flowers': items[5] });
    })
});

module.exports = router;
