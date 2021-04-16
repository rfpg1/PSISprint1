var express = require('express');
var router = express.Router();
var photos_controller = require('../controllers/photosController');

router.post('/photo', photos_controller.post_photo);

router.delete('/:id', photos_controller.delete_photo);

router.get('/photo', photos_controller.get_userPhotos);

module.exports = router;