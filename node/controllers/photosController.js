var Photo = require('../models/photo');
var Like = require('../models/like');
var Favorite = require('../models/favorite');
var mongoose = require('mongoose');

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
        Like.remove({ "photo": photo._id }, function(err, result) {
                if (err) { return next(err) }
            })
            //TODO
        Favorite.remove({ "photo": id }, function(err, result) {
            if (err) { return next(err) }
        })
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

exports.post_favorite = function(req, res, next) {
    const id = req.params.id
    Favorite.find({ "user": req.body.user, "photo": id })
        .exec(function(err, favorites) {
            if (favorites.length !== 0) {
                Favorite.findOneAndDelete({ "user": req.body.user, "photo": id }, function(err, result) {
                    if (err) { return next(err) }
                    res.json(result)
                })
            } else {
                var fav = new Favorite({ "user": req.body.user, "photo": id })
                fav.save(function(err, favorite) {
                    if (err) return next(err)
                    res.json(favorite)
                })
            }
        })
}

exports.is_favorite = function(req, res, next) {
    const id = req.query.id;
    Favorite.find({ "user": req.query.user, "photo": id })
        .exec(function(err, favorite) {
            if (favorite.length !== 0) {
                res.json({ message: "True" })
            } else {
                res.json({ message: "False" })
            }
        })
}

exports.get_favorites = function(req, res, next) {
    const user = req.query.user;
    Favorite.find({ "user": user })
        .exec(function(err, favorites) {
            if (err) return next(err)
            var t = []
            var count = 0;
            favorites.forEach((favorite, index, array) => {
                Photo.find({ _id: favorite.photo })
                    .exec(function(err, photo) {
                        if (err) { return next(err) }
                        count++;
                        t.push(photo[0])
                        if (count === array.length) {
                            callback(t, res);
                        }
                    })
            })
        })
}

function callback(t, res) {
    res.json(t)
}