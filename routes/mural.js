var express = require('express');
var router = express.Router();

var muralController = require('../controllers/muralController');

router.get('/', muralController.get_recent);

router.get('/favorites', muralController.get_favorites);

module.exports = router;