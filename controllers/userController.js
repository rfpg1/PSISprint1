var User = require('../models/user');

var mongoose = require('mongoose');

exports.post_user = function (req, res, next) {
    var new_user = new User(req.body);
    res.json(req.body);
    
}