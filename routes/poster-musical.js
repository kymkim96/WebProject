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

//상세 페이지
router.get('/detail', async (req, res, next) => {
    try {
        const post = await Poster.findOne({ where: { id: req.query.id }});
        const reviews = await post.getReviews({
            attributes: [
                'id',
                'userId',
                'img',
                'content',
                'rank',
                [db.Sequelize.fn('date_format', db.Sequelize.col('createdAt'), '%Y-%m-%d'), 'createdAt'],
            ]
        });

        const users = await User.findAll();

        res.render('viewReview', {
            post: post,
            reviews: reviews,
            users: users,
        });
    } catch(error) {
        console.error(error);
        next(error)
    }
});

//writeReview : 뮤지컬 리뷰 업로드 페이지
router.get('/review-upload', async (req, res, nex) => {
    try {
        const post = await Poster.findOne({where: {id: req.query.id}});
        res.render('writeReview', {
            post: post,
        })
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
