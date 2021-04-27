var Photo = require('../models/photo');
var Like = require('../models/like');

exports.post_photo = function(req, res, next) {
    console.log("t")
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

exports.put_like = function(req, res, next) {
    const id = req.params.id;
    Like.count({ "user": req.body.user, "photo": id }, function (err, count) {
        if(count==0) {
            var Sim = new Like({ "user": req.body.user, "photo": id })
            Sim.save(function(err, like) {
                if (err) { return next(err) }
                Photo.find({_id: id})
                     .exec(function(err, photo) {
                        if (err) { return next(err) }
                        Photo.findByIdAndUpdate({_id: id}, {likes : photo[0].likes + 1}, {new: true}, function (err, photo) {})
                        res.json(like);
                     })
            })
        } else {
            res.json({ message: 'User já deu like neste mambo' })
        }  
    });
};