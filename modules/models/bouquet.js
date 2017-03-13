var express = require('express');
var mongoose = require('../libs/mongoose')

function createSchema() {
    var schema = new mongoose.Schema({
        name: String,
        ava: String,
        link: String,
        title: String,
        list: Object
    });
    return schema;
}

function createModel(name) {
    var schema = createSchema()
    var type = mongoose.model(name, schema);
    return type;
}

// let model = createModel('bouquet');
// var item = new model({
//     name: 'test',
//     ava: '/img/prasdnik.jpeg',
//     link: '/bouquet/holiday',
//     title: 'ПРАЗДНИЧНЫЕ',
//     list: [
//             '/img/bouquet/holiday/001.jpg',
//             '/img/bouquet/holiday/002.jpg',
//             '/img/bouquet/holiday/003.jpg',
//             '/img/bouquet/holiday/004.jpg',
//             '/img/bouquet/holiday/005.jpeg'
//     ]
// })
// item.save(function (err, item) { if (err) { console.log("something wrong") }});

module.exports = createModel('bouquet');