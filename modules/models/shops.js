var express = require('express');
var mongoose = require('../libs/mongoose');

function createSchema() {
    var schema = new mongoose.Schema({
        name: String,
        title: String,
        link: String,
        ava: String,
        address: String,
        phone_link: String,
        phone: String,
        time: String,
        coord_x: Number,
        coord_y: Number,
        description: String
    });
    return schema;
}

function createModel(name) {
    var schema = createSchema()
    var type = mongoose.model(name, schema);
    return type;
}

// let model = createModel('shops');
// var item = new model({
//     name: "kosmos",
//     title: "КОСМОС",
//     link: "/shops/kosmos",
//     ava: "/img/polej.jpg",
//     address: "г. Рузаевка, ул. Маяковского, 99",
//     phone_link: "tel:+79271906734",
//     phone: "+7(927)190-67-34",
//     time: "ежедневно/8:00-20:00",
//     coord_x: 54.072793,
//     coord_y: 44.953074,
//     description: "Магазин находится в самом центре города, в шаговой доступности от университетского городка, площади Тысячелетия и цетрального рынка"
// })
// item.save(function (err, item) { if (err) { console.log("something wrong") }});

module.exports = createModel('shops');