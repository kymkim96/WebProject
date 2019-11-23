const express = require('express');
const router = express.Router();
const { Poster } = require('../models');

//연극 페이지 로딩
router.get('/page/:id', async (req, res) => {
   try {
       const posts = await Poster.findAll({where: {classify: 'act'}});
       res.render('act', {
           posts: posts,
           pageId: req.params.id,
       });
   } catch(error) {
       console.error(error);
       next(error);
   }
});

router.get('/search/:id', async (req, res, next) => {
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

