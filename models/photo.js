// File: ./models/somemodel.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var Photo = new Schema({
    user: {type: Schema.Types.Object},
    photo: {type: String},
    likes: {type: Number} ,
    date: {type: Date},
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('PhotoModel', Photo);