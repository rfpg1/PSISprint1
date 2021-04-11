var User = require('../models/user');

var mongoose = require('mongoose');

exports.post_user = function (req, res, next) {
    
    res.json(req.body);
    /*
    var new_user = new User(req.body);
    new_user.save(function (err, user) {
        if (err) { res.send(err); }
        res.json(user);
    })
    */
}