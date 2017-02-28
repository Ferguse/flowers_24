var express = require('express');
var mongoose = require('../libs/mongoose')

function createSchema() {
    var schema = new mongoose.Schema({
        name: String,
        img: String,
        link: String,
        description: String,
        list: Object
    });
    return schema;
}

function createModel(name) {
    var schema = createSchema()
    var type = mongoose.model(name, schema);
    return type;
}

// let model = createModel('flower');
// var item = new model({
//     name: 'other',
//     img: '/img/lilia.jpg',
//     link: '/flowers/other',
//     title: 'ДРУГИЕ',
//     list: [
//         ['/img/lilii.jpg','Лилия'],
//         ['/img/irisi.jpg','Ирис'],
//         ['/img/gerbera.jpg','Гербера'],
//         ['/img/gerbera.jpg','Альстромерия'],
//         ['/img/gerbera.jpg','Гипсофила'],
//         ['/img/gerbera.jpg','Цимбидиум'],
//         ['/img/gerbera.jpg','Листья Финик'],
//         ['/img/gerbera.jpg','Листья Эвкалипт'],
//         ['/img/gerbera.jpg','Солидаго'],
//         ['/img/gerbera.jpg','Статица']
//     ]
// })
// item.save(function (err, flower) { if (err) { console.log("something wrong") }});

module.exports = createModel('flower');