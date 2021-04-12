var express = require('express');
var router = express.Router();
var photos_controller = require('../controllers/photosController');

router.post('/photo', photos_controller.post_photo);

module.exports = router;