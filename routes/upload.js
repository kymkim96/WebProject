const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Poster, Review, User } = require('../models');
const { checkAdminPermission, isLoggedIn } = require('./middlewares');

fs.readdir('uploads', (error) => {
    if(error) {
        console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다');
        fs.mkdirSync('uploads');
    }
});

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
});

// method: post, action: /upload/img
// 이미지 첨부 라우터
router.post('/img', upload.single('img'), (req, res) => {
    //console.log(req.file);
    res.json({url: `/img/${req.file.filename}`});
});

// method: post, action: /upload/poster-act
// 연극 포스터 업로드 라우터
const upload2 = multer();
router.post('/poster', checkAdminPermission, upload2.none(), async (req, res, next) => {
    try {
         const post = await Poster.create({
            title: req.body.title,  //제목
            thumbnail: req.body.url,  //업로드한 이미지
            classify: req.body.class,    //연극인지 뮤지컬인지에 대한 분류
            genre: req.body.categoryClass,
            shortinfo: req.body.shortinfo,
            longinfo: req.body.longinfo,
        });
         //default review 생성, 리뷰 안내 글
         const review = await Review.create({
             content: '이곳은 리뷰 게시판입니다',
             rank: 0,
         });
         await post.addReview(review);
        res.redirect('/adminpage');
    } catch(error) {
        console.error(error);
        next(error);
    }
});

//이벤트 및 공지 업로드 라우터
router.post('/en', checkAdminPermission, upload2.none(), async (req, res, next) => {
   const { title, content, classify, url} = req.body;
   try {
       const post = await Poster.create({
           title: title,
           longinfo: content,
           classify,
           thumbnail: url,
       });

       if(classify === 'event')
           return res.redirect('/event/1');
       else return res.redirect('/notice/1');

   } catch(error) {
       console.error(error);
       return next(error);
   }
});

//리뷰 업로드 라우터
router.post('/review-upload', isLoggedIn, upload2.none(), async (req, res, next) => {
    try {
        console.log(req.body.startinput);
        const review = await Review.create({
            content: req.body.content,
            img: req.body.url,
            rank: req.body.starinput,
        });

        const post = await Poster.findOne({ where: {id: req.body.id}});
        await post.addReview(review);

        const user = await User.findOne({ where: {id: req.user.id}});
        await user.addReview(review);

        res.redirect(`/poster-act/detail/1?id=${req.body.id}`);
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;