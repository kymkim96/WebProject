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

})
