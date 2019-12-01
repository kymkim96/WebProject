const express = require('express');
const router = express.Router();
const { Poster, Review } = require('../models');

//연극 페이지 로딩
router.get('/page/:id', async (req, res, next) => {
   try {
       const posts = await Poster.findAll({where: {classify: 'act'}});
       const postCount = await Poster.findAndCountAll({where: {classify: 'act'}});
       res.render('act', {
           posts: posts,
           pageId: req.params.id,
           pageCount: postCount.count,
       });
   } catch(error) {
       console.error(error);
       next(error);
   }
});

//검색 기능
router.get('/search/:id', async (req, res, next) => {
    try {
       const posts = await Poster.findAll({where: {title: req.query.title}});
       const postCount = await Poster.findAndCountAll({where: {title: req.query.title}});
       console.log(postCount);
       res.render('act', {
           posts: posts,
           pageId: req.params.id,
           pageCount: postCount.count,
       });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

//viewAct : 연극 상세 페이지
router.get('/detail/:id', async (req, res, next) => {
    try {
        const post = await Poster.findOne({ where: { id: req.query.id }});
        //console.log(post);
        const reviews = await post.getReviews();
        res.render('viewAct', {
            post: post,
            pageId: req.params.id,
            reviews: reviews,
            pageCount: reviews.length,
        });
    } catch(error) {
        console.error(error);
        next(error)
    }
});

//writeReview : 연극 리뷰 업로드 페이지
router.get('/review-upload', async (req, res, nex) => {
    try {
        const post = await Poster.findOne({where: {title: req.query.title}});
        res.render('writeReview', {
            post: post,
        })
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;

