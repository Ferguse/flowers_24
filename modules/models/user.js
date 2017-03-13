var express = require('express');
var mongoose = require('../libs/mongoose');

function createSchema() {
    var schema = new mongoose.Schema({
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    });
    return schema;
}

function createModel(name) {
    var schema = createSchema()
    var type = mongoose.model(name, schema);
    return type;
}
module.exports = createModel('user');