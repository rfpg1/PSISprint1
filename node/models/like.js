var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Like = new Schema({
    user: { type: String },
    photo: { type: String },
});

module.exports = mongoose.model('Like', Like);