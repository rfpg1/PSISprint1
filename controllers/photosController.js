var Photo = require('../models/photo');

exports.post_photo = function (req, res, next) {
    var Cr7 = new Photo(req.body);
    //Cr7.save(function (err, photo) {
    //    if (err) { return next(err) }
    //    res.json( photo );
    //})
    console.log(Cr7);
    res.json(req.body);
};