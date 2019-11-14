const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Poster } = require('../models');
const { checkAdminPermission } = require('./middlewares');

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
router.post('/img', upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json(`{url: /img/${req.file.filename}}`);
});

// method: post, action: /upload/poster-act
const upload2 = multer();
router.post('/poster-act', checkAdminPermission, upload2.none(), async (req, res, next) => {
    try {
         await Poster.create({
            content: req.body.content,  //제목
            img: req.body.url,  //업로드한 이미지
            classify: req.body.classify,    //연극인지 뮤지컬인지에 대한 분류
        });
        res.redirect('/adminpage');
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;