var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json("teste");
  //TODO get all users;
});

router.post('/regist', userController.post_user);

router.get('/login', userController.get_user);

module.exports = router;
