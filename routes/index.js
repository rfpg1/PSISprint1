var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Photo = require('../models/photo');

var async = require('async');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('teste');
});

var users = [];

router.get('/init', (req, res, next) => {

  async.series(
    deleteDB(),
    userCreate('Richie', '123'),
    userCreate('Daniel', '123'),
    photoCreate('Richie', 'Praia', 'Ida à praia', 1, new Date("2000-12-17T03:24:00")),
    photoCreate('Richie', 'fpg', 'fpg #1', 69, new Date("1995-12-17T03:24:00")),
    photoCreate('Richie', 'fpg2', 'fpg #2', 67,  new Date("2005-12-17T03:24:00")),
    photoCreate('Daniel', 'gordo', 'Gatão', 3, new Date("2010-12-17T03:24:00"))
  )
  res.json('DB created');
})

function deleteDB() {
  User.collection.drop();
  Photo.collection.drop();
}

//Very startings
function userCreate(name, pw) {
  userDetail = { name: name, pw: pw }
  var user = new User(userDetail);
  users.push(user);
  user.save(function (err) {
    if (err) {
      console.log('User could not be created during dbinit')
      return;
    }
    console.log('New user: ' + name);
  });
}

function photoCreate(user, photo, likes, date) {
  photoDetail = { user: user, photo: photo, likes: likes, date: date }
  var photo = new Photo(photoDetail);
  photo.save(function (err) {
    if (err) {
      console.log('Photo could not be created during dbinit')
      return
    }
    console.log('New photo added');
  });
}
//Very endings

module.exports = router;
