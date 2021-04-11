// File: ./models/somemodel.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  pw: Date,
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('UserModel', User);