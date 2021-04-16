var Photo = require('../models/photo');

exports.post_photo = function (req, res, next) {
    var Cr7 = new Photo({"user": req.body.user, "photo": req.body.photo, "descricao": req.body.descricao, "likes": req.body.likes, "date": Date.now()});
    Cr7.save(function (err, photo) {
        if (err) { return next(err) }
        res.json( photo );
    })
};

exports.delete_photo = function (req, res, next) {
    var id = req.params.id;
    Hero.findByIdAndDelete(id, function (err, photo) {
        if (err) { return next(err) }
        res.json({ message: 'Photo deleted successfully' })
    })
};