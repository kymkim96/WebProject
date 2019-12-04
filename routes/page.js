var express = require('express');
var router = express.Router();
const { isLoggedIn, isNotLoggedIn, adminCode, checkAdminPermission } = require('./middlewares');

//메인 페이지
router.get('/', function(req, res, next) {
  res.render('Home', {
    auth: req.isAuthenticated(),
  });
});

router.get('/introduce', isNotLoggedIn, function(req, res, next) {
  res.render('intro');
});

//로그인 페이지
router.get('/signIn', isNotLoggedIn, function(req, res, next) {
  res.render('log');
});

//회원가입 페이지
router.get('/signUp', isNotLoggedIn, function(req, res, next) {
  res.render('signUp');
});

module.exports = router;
