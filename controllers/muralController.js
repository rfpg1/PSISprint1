var Photo = require('../models/photo');

var mongoose = require('mongoose');

exports.get_recent = function (req, res, next) {
    Photo.find()
        .slice(0, 50)
        .exec(function (err, list_photo){
            if (err) { return next(err); }
            res.json(list_photo);
        });
}