var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //TODO get all users;
});

router.get('/regist', userController.post_user);

module.exports = router;
