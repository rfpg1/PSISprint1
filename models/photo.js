
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Photo = new Schema({
    user: {type: String},
    photo: {type: String},
    likes: {type: Number} ,
    date: {type: String},
});

module.exports = mongoose.model('Photo', Photo);