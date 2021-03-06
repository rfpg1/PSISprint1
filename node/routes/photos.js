  var express = require('express');
  var router = express.Router();
  var photos_controller = require('../controllers/photosController');

  router.post('/photo', photos_controller.post_photo);

  router.delete('/:id', photos_controller.delete_photo);

  router.get('/photo', photos_controller.get_userPhotos);

  router.put('/like/:id', photos_controller.update_like);

  router.get('/likes', photos_controller.get_likes);

  router.get('/isLiked', photos_controller.is_liked);

  router.get('/favorites', photos_controller.get_favorites)

  router.get('/isFavorite', photos_controller.is_favorite);

  router.post('/favorite/:id', photos_controller.post_favorite);

  router.get('/:id', photos_controller.get_photo);

  module.exports = router;