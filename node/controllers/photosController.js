var Photo = require('../models/photo');
var Like = require('../models/like');

exports.post_photo = function(req, res, next) {
    var Cr7 = new Photo({ "user": req.body.user, "name": req.body.name, "likes": req.body.likes, "descricao": req.body.descricao, "date": Date.now(), "photo": req.body.photo });
    Cr7.save(function(err, photo) {
        if (err) { return next(err) }
        res.json(photo);
    })
};

exports.get_userPhotos = function(req, res, next) {
    var utilizador = req.query.user;
    Photo.find({ user: utilizador })
        .exec(function(err, user_photos) {
            if (err) { return next(err); }
            res.json(user_photos);
        });
};

exports.delete_photo = function(req, res, next) {
    const id = req.params.id;
    Photo.findByIdAndDelete({ _id: id }, function(err, photo) {
        if (err) { return next(err) }
        res.json({ message: 'Photo deleted successfully' })
    })
};

exports.get_photo = function(req, res, next) {
    const id = req.params.id;
    Photo.findById({ _id: id })
        .exec(function(err, photo) {
            if (err) { return next(err) }
            res.json(photo);
    });
};

exports.update_like = function(req, res, next) {
    const id = req.params.id;
    Like.find({ "user": req.body.user, "photo": id })
        .exec(function(err, like1) {
            if (like1.length !== 0) {
                Like.findOneAndDelete({ "user": req.body.user, "photo": id }, function(err, like2) {
                    if (err) { return next(err) }
                })
                Photo.find({ _id: id })
                    .exec(function(err, photo) {
                        if (err) { return next(err) }
                        Photo.findByIdAndUpdate({ _id: id }, { likes: photo[0].likes - 1 }, { new: true }, function(err, photo) {
                            if (err) { return next(err) }
                        })
                    })
                res.json({ message: 'Like deleted' })
            } else {
                var Sim = new Like({ "user": req.body.user, "photo": id })
                Sim.save(function(err, like) {
                    if (err) { return next(err) }
                })
                Photo.find({ _id: id })
                    .exec(function(err, photo) {
                        if (err) { return next(err) }
                        Photo.findByIdAndUpdate({ _id: id }, { likes: photo[0].likes + 1 }, { new: true }, function(err, photo) {})
                    })
                res.json({ message: 'Photo Liked' })
            }
        })
};

exports.get_likes = function(req, res, next) {
    Like.find({})
        .exec(function(err, likes) {
            if (err) { return next(err) }
            res.json(likes)
        })
};

exports.is_liked = function(req, res, next) {
    const id = req.query.id;
    Like.find({ "user": req.query.user, "photo": id })
        .exec(function(err, like) {
            if (like.length !== 0) {
                res.json({ message: "True" })
            } else {
                res.json({ message: "False" })
            }
        })
};