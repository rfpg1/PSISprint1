
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Photo = new Schema({
    user: {type: Schema.Types.Object},
    photo: {type: String},
    likes: {type: Number} ,
    date: {type: Date},
});

module.exports = mongoose.model('Photo', Photo);