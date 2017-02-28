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

// let model = createModel('flavours');
// var item = new model({
//     name: 'holiday',
//     ava: '/img/prasdnik.jpeg',
//     link: '/flavours/holiday',
//     title: 'ПРАЗДНИЧНЫЕ',
//     list: [
//             '/img/flouvers/holiday/001.jpg',
//             '/img/flouvers/holiday/002.jpg',
//             '/img/flouvers/holiday/003.jpg',
//             '/img/flouvers/holiday/004.jpg',
//             '/img/flouvers/holiday/005.jpeg'
//     ]
// })
// item.save(function (err, item) { if (err) { console.log("something wrong") }});

module.exports = createModel('flavours');