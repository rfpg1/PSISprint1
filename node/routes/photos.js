var express = require('express');
var router = express.Router();
var photos_controller = require('../controllers/photosController');

router.post('/photo', photos_controller.post_photo);

router.delete('/:id', photos_controller.delete_photo);

router.get('/photo', photos_controller.get_userPhotos);

router.put('/like/:id', photos_controller.update_like);

router.get('/likes', photos_controller.get_likes);

router.get('/isLiked', photos_controller.is_liked);

module.exports = router;