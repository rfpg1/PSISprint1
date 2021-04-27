var Photo = require('../models/photo');

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
    console.log(id)
    Photo.findByIdAndDelete({ _id: id }, function(err, photo) {
        if (err) { return next(err) }
        res.json({ message: 'Photo deleted successfully' })
    })
};

exports.like_photo = function(req, res, next) {
    Like.count({ "user": req.body.user, "photo": req.body.photo }, function (err, count){ 
        if(count==0){
            Sim.save(function(err, like) {
                if (err) { return next(err) }
                var p = Photo.find({photo: req.body.photo});  
                Photo.findOneAndUpdate({photo: req.body.photo}, {likes : p.likes + 1}, function (err, photo) {})
                res.json(like);
            })
        } else {
            res.json({ message: 'User já deu like neste mambo' })
        }
    });
};