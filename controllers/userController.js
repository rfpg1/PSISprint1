var User = require('../models/user');

var mongoose = require('mongoose');

exports.get_user = function (req, res, next) {
    User.find({ name: req.body.name, pw: req.body.pw })
        .exec(function (err, user) {
            if (err) { return next(err) }
            res.json(user);
        })
}

exports.post_user = function (req, res, next) {
    var new_user = new User(req.body);
    new_user.save(function (err, user) {
        if (err) { res.send(err); }
        res.json(user);
    })
}