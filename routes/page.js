var express = require('express');
var router = express.Router();
const { isLoggedIn, isNotLoggedIn, adminCode, checkAdminPermission } = require('./middlewares');
var check = false;
var isAdmin = check;

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

//회원 정보 수정페이지
router.get('/information-update', isLoggedIn, function (req, res, next) {
  res.render('informaion');
});

//이벤트 페이지
router.get('/event', isLoggedIn, function (req, res, next) {
  if(req.user.admincode === adminCode.admincode )
    isAdmin = true;
  res.render('event', {
    isAdmin: isAdmin,
  });
});

//공지사항
router.get('/notice', isLoggedIn, function (req, res, next) {
  if(req.user.admincode === adminCode.admincode ) {
    isAdmin = check;
    check = false;
  }
  res.render('notice', {
    isAdmin,
  });
});

module.exports = router;
