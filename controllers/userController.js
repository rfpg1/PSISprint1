var User = require('../models/user');

var mongoose = require('mongoose');

exports.post_user = function (req, res, next) {
    console.log(req.body)
    User.find({ name: req.body.name, pw: req.body.pw })
        .exec(function (err, user) {
            if (err) { return next(err) }
            
            if(!user){
                var new_user = new User(req.body);
                new_user.save(function (err, user) {
                    if (err) { res.send(err); }
                    res.json(user);
                })
            } else {
                res.json({message:"User already exists"});
            }
            
           //res.json(!user)
        })
}