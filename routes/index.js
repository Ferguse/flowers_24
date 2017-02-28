var express = require('express');
var router = express.Router();
var mongoose = require('../modules/libs/mongoose')
var category = require('../modules/models/flowers')
var flavours = require('../modules/models/flavours')
var shops = require('../modules/models/shops')

var config = require('../config.json');

//=====================================
/* GET home page. */

router.get('/', function (req, res, next) {
    category.find({}, function (err, items) {
        flavours.find({}, function (err, flavours) {
            shops.find({}, function (err, shops) {
                function getRand(max, min) {
                    let result = Math.random() * (max - min) + min;
                    return Math.ceil(result)
                }
                res.render('index', {'flowers': items, 'flavours': flavours, 'shops': shops, random: getRand(0,flavours.length)});
            })
        })
    })
});

module.exports = router;
