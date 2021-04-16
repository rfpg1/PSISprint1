var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Photo = new Schema({
    user: {type: String},
    name: {type: String},
    photo: {type: String},
    likes: {type: Number},
    descricao: {type: String},
    date: {type: Date},
});

module.exports = mongoose.model('Photo', Photo);