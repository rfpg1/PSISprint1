var Photo = require('../models/photo');

var mongoose = require('mongoose');

exports.get_recent = function (req, res, next) {
    Photo.find()
        .exec(function (err, list_photo){
            if (err) { return next(err); }
            list_photo.sort( function(a, b) {return b.date - a.date} )
            res.json(list_photo);
        });
}

exports.get_favorites = function (req, res, next) {
    Photo.find()
        .exec(function (err, list_photo){
            if (err) { return next(err); }
            console.log("Banana");
            list_photo.sort( function(a, b) {return a.likes > b.likes})
            res.json(list_photo);
        });
}