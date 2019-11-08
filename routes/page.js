var express = require('express');
var router = express.Router();

//메인 페이지
router.get('/', function(req, res, next) {
  res.render('test');
});

//로그인 페이지
router.get('/profile', function(req, res, next) {
  res.render('test2');
});

//회원가입 페이지
router.get('/join', function(req, res, next) {
  res.render('test3');
});

module.exports = router;
