var Photo = require('../models/photo');
var Like = require('../models/like');
var Favorite = require('../models/favorite');

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

exports.post_favorite = function(req, res, next) {
    const id = req.params.id
    Favorite.find({ "user": req.body.user, "photo": req.body.photo })
        .exec(function(err, favorite) {
            if (err) return next(err)
            if (favorite.length !== 0) {
                Favorite.findOneAndDelete({ "user": req.body.user, "photo": req.body.photo }, function(err, favorite) {
                    if (err) return next(err);
                    res.json("Fav removed")
                })
            } else {
                var fav = new Favorite({ "user": req.body.user, "photo": req.body.photo })
                fav.save(function(err, favorite) {
                    if (err) return next(err)
                    res.json(favorite)
                })
            }
        })
}

exports.is_favorite = function(req, res, next) {
    const id = req.query.id;
    Photo.find({ _id: id })
        .exec(function(err, photo) {
            if (err) return next(err)
            Favorite.find({ "user": req.query.user })
                .exec(function(err, fav) {
                    var b = false;
                    if (err) return next(err);
                    for (i = 0; i < fav.length; i++) {
                        if (photo[0]._id == fav[i].photo._id) {
                            b = true
                            res.json({ message: "True" })
                            break;
                        }
                    }
                    if (!b) {
                        res.json({ message: "False" })
                    }
                })
        })
}

exports.get_favorites = function(req, res, next) {
    const user = req.query.user;
    Favorite.find({ "user": user })
        .exec(function(err, favorites) {
            if (err) return next(err)
            res.json(favorites)
        })
}