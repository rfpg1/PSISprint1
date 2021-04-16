var Photo = require('../models/photo');

exports.post_photo = function (req, res, next) {
    var Cr7 = new Photo({"user": req.body.user, "name": req.body.name, "photo": req.body.photo, "descricao": req.body.descricao, "likes": req.body.likes, "date": Date.now()});
    Cr7.save(function (err, photo) {
        if (err) { return next(err) }
        res.json( photo );
    })
};

exports.get_userPhotos = function (req, res, next) {
    var utilizador = req.query.user;
    //console.log(user);
    Photo.find({user: utilizador})
        .exec(function (err, user_photos) {
            if (err) { return next(err); }
            res.json(user_photos);
        });
};

exports.delete_photo = function (req, res, next) {
    var id = req.params.id;
    Hero.findByIdAndDelete(id, function (err, photo) {
        if (err) { return next(err) }
        res.json({ message: 'Photo deleted successfully' })
    })
};