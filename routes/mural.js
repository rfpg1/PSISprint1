var express = require('express');
var router = express.Router();

var muralController = require('../controllers/muralController');

router.get('/', muralController.get_recent);

module.exports = router;