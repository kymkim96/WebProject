const express = require('express');
const router = express.Router();
const { Poster} = require('../models');

//연극 페이지 로딩
router.get('/poster-act', async (req, res) => {
   try {
       const posts = await Poster.findOne({where: {classify: 'act'}});
       res.render('act', {
           posts: posts
       })
   } catch(error) {
       console.error(error);
       return next(error);
   }
});

