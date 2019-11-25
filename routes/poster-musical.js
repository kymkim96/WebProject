const express = require('express');
const router = express.Router();
const { Poster } = require('../models');

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

router.get('/search/:id', async (req, res, next) => {
    try {
        const post = await Poster.findAll({where: {title: req.query.title}});
        res.render('musical', {
            posts: post,
            pageId: req.params.id
        })
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/detail/:title', async (req, res, next) => {
    try {
        const post = await Poster.findOne({})
        res.render('test2', {

        })
    } catch(error) {
        console.error(error);
        next(error)
    }
});

module.exports = router;
