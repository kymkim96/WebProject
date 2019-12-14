var express = require('express');
var router = express.Router();
const { isLoggedIn, isNotLoggedIn, adminCode, checkAdminPermission } = require('./middlewares');
const { Poster, User } = require('../models');
var check = true;
var isAdmin = false;
var db = require('../models');

//메인 페이지
router.get('/', function(req, res, next) {
  res.render('Home', {
    auth: req.isAuthenticated(),
  });
});

//소개 페이지
router.get('/introduce', function(req, res, next) {
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

  const posts = await Poster.findAll({
    attributes: [
        'id',
        'title',
      [db.Sequelize.fn('date_format', db.Sequelize.col('createdAt'), '%Y-%m-%d'), 'createdAt'],
    ],
    where: {
    classify: 'event',
    }});

  res.render('event', {
    user: req.user,
    posts: posts,
    pageId: req.params.id,
    pageCount: posts.length,
  });
});

//공지사항
router.get('/notice/:id', isLoggedIn, async (req, res, next) => {

  const posts = await Poster.findAll({
    attributes: [
      'id',
      'title',
      [db.Sequelize.fn('date_format', db.Sequelize.col('createdAt'), '%Y-%m-%d'), 'createdAt'],
    ],
    where: {
      classify: 'notice',
    }});
  res.render('notice', {
    user: req.user,
    posts: posts,
    pageId: req.params.id,
    pageCount: posts.length,
  });
});

//연극, 뮤지컬 업로드 페이지
router.get('/addContent', checkAdminPermission, function (req, res, next) {
  res.render('addContents');
});

//이벤트, 공지사항 업로드 페이지
router.get('/writeBoard', checkAdminPermission, function (req, res, next) {
  const update = false;
  res.render('writeBoard', {
    update,
  });
});

//이벤트, 공지사항 상세 페이지
router.get('/viewEvent_notice', isLoggedIn, async (req, res, next) => {
  const post = await Poster.findOne({
    attributes: [
      'id',
      'title',
      'longinfo',
      'classify',
      [db.Sequelize.fn('date_format', db.Sequelize.col('createdAt'), '%Y-%m-%d'), 'createdAt'],
    ],
    where: {
      id: req.query.id,
    }});
  res.render('viewEvent_Notice', {
    post,
    user: req.user,
  });
});

//이벤트, 공지사항 수정 페이지
router.get('/writeBoard-update', checkAdminPermission, async (req, res, next) => {
  console.log(req.query.id);
  const post = await Poster.findOne({where: {id: req.query.id}});
  const update = true;  //수정 폼이 나오도록
  res.render('writeBoard', {
    post,
    update,
  });
});

//맞춤 추천 페이지
router.get('/recommend/:id', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id }});
    const posts = await Poster.findAll({ where: { genre: user.category }});
    res.render('recommend', {
      posts,
      pageId: req.params.id,
      pageCount: posts.length,
    });
  } catch(error) {
    console.error(error);
    next(error);
  }

})

module.exports = router;
