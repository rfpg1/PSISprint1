
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Photo = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    photo: {type: String},
    descricao: {type: String},
    likes: {type: Number} ,
    date: {type: Date},
});

module.exports = mongoose.model('Photo', Photo);