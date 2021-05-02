var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Favorite = new Schema({
    user: { type: String },
    photo: { type: String },
});

module.exports = mongoose.model('Favorite', Favorite);