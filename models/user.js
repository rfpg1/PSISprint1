
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
  name: {type: String},
  pw: {type: String},
});

module.exports = mongoose.model('User', User);