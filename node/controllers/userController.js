var User = require('../models/user');

var mongoose = require('mongoose');

exports.get_user = function (req, res, next) {
    User.find({ name: req.query.name, pw: req.query.pw })
        .exec(function (err, user) {
            console.log(user)
            if (err) { return next(err) }
            res.json(user);
        })
}

exports.post_user = function (req, res, next) {
    User.find({ name: req.body.name})
        .exec(function (err, user) {
            if (err) { return next(err) }
            if(user.length === 0){
                var new_user = new User(req.body);
                new_user.save(function (err, user) {
                    if (err) { res.send(err); }
                    res.json(user);
                })
            } else {
                res.json({message:"User already exists"});
            }
        })
}