const express = require('express');
const router = express.Router();
const { Poster, Review } = require('../models');
const { isLoggedIn } = require('./middlewares');

//뮤지컬 포스터 페이지 출력
router.get('/page/:id', async (req, res, next) => {
    try {
        const posts = await Poster.findAll({where: {classify: 'musical'}});
        const postCount = await Poster.findAndCountAll({where: {classify: 'musical'}});
        res.render('musical', {
            posts: posts,
            pageId: req.params.id,
            pageCount: postCount.count,
        });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

//검색 입력 기능
router.get('/search/:id', async (req, res, next) => {
    try {
        const post = await Poster.findAll({where: {title: req.query.title}});
        const postCount = await Poster.findAndCountAll({where: {title: req.query.title}});
        res.render('musical', {
            posts: post,
            pageId: req.params.id,
            pageCount: postCount.count,
        })
    } catch(error) {
        console.error(error);
        next(error);
    }
});

//연극 상세 페이지 및 리뷰 보이기
router.get('/detail/:id', async (req, res, next) => {
    try {
        const post = await Poster.findOne({ where: { id: req.query.id }});
        res.render('test2', {
            post: post,
        })
    } catch(error) {
        console.error(error);
        next(error)
    }
});

//연극 업로드 폼 로딩
router.get('/review-upload', isLoggedIn, async (req, res, next) => {
    const post = await Poster.findOne({ where: {id: req.query.id }});
    res.render('test2', {
        post: post,
    })
})

module.exports = router;
