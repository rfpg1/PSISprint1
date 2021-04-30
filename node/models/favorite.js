var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Favorite = new Schema({
    user: { type: String },
    photo: { type: Schema.Types.Object, ref: 'Photo' },
});

module.exports = mongoose.model('Favorite', Favorite);