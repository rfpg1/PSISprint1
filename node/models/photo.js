var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Photo = new Schema({
    user: { type: String },
    name: { type: String },
    likes: { type: Number },
    descricao: { type: String },
    date: { type: Date },
    photo: { type: String },
});

module.exports = mongoose.model('Photo', Photo);