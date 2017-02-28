var express = require('express');
var router = express.Router();
var mongoose = require('../modules/libs/mongoose')
var flavours = require('../modules/models/flavours')
/* GET home page. */
router.get('/wedding', function(req, res, next) {
    flavours.find({}, function (err, items) {
        res.render('flavours', { 'flavours': items[0] });
    })
});
router.get('/birthday', function(req, res, next) {
    flavours.find({}, function (err, items) {
        res.render('flavours', { 'flavours': items[1] });
    })
});
router.get('/valentin', function(req, res, next) {
    flavours.find({}, function (err, items) {
        res.render('flavours', { 'flavours': items[2] });
    })
});
router.get('/holiday', function(req, res, next) {
    flavours.find({}, function (err, items) {
        res.render('flavours', { 'flavours': items[3] });
    })
});

module.exports = router;
