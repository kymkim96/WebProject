const express = require('express');
const router = express.Router();
const { Poster } = require('../models');

router.get('/page/:id', async (req, res, next) => {
    try {
        posts = await Poster.findAll({where: {classify: musical}});
        render('musical', {
            posts: posts,
            pageId: req.params.id,
        });
    } catch(error){
        console.error(error);
        next(error);
    }
});

router.get('/search/:id', async (req, res) => {
    try {
        const post = await Poster.findOne({where: {title: req.query.title}});
        res.render('act', {
            posts: post,
            pageId: req.params.id
        })
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
