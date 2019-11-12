var express = require('express');
var router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

//메인 페이지
router.get('/', function(req, res, next) {
  res.render('home');
});

//로그인 페이지
router.get('/signIn', isNotLoggedIn, function(req, res, next) {
  res.render('test2');
});

//회원가입 페이지
router.get('/singUp', isNotLoggedIn, function(req, res, next) {
  res.render('test3');
});

//뮤지컬 페이지
router.get('/poster-musical', function(req, res) {
  res.render('musical');
});

module.exports = router;
