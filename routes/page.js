var express = require('express');
var router = express.Router();
const { isLoggedIn, isNotLoggedIn, adminCode, checkAdminPermission } = require('./middlewares');
const { Poster, User } = require('../models');
var check = true;
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
  res.render('information', {
    user: req.user,
  });
});

//이벤트 페이지
router.get('/event/:id', isLoggedIn, async (req, res, next) => {
  if(req.user.admincode === adminCode.admincode ) {
    check = false;
  }

  const posts = await Poster.findAll({where: {classify: 'event'}});

  res.render('event', {
    isAdmin: isAdmin,
    posts: posts,
    pageId: req.params.id,
    pageCount: posts.length,
  });
});

//공지사항
router.get('/notice/1', isLoggedIn, async (req, res, next) => {
  if(req.user.admincode === adminCode.admincode ) {
    check = false;
  }

  const posts = await Poster.findAll({where: {classify: 'notice'}});

  res.render('notice', {
    isAdmin,
    posts: posts,
    pageId: req.params.id,
  });
});

//연극, 뮤지컬 업로드 페이지
router.get('/addContent', checkAdminPermission, function (req, res, next) {
  res.render('addContents');
});

//이벤트, 공지사항 업로드 페이지
router.get('/writeBoard', checkAdminPermission, function (req, res, next) {
  res.render('writeBoard');
});

module.exports = router;
