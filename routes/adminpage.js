/*
    연극, 뮤지컬 포스터 페이지 업로드 등 관리자 페이지입니다
 */

const express = require('express');
const router = express.Router();

const { checkAdminPermission } = require('./middlewares');

//관리자 페이지 출력
router.get('/', function(req, res) {
    res.render('manageMypage');
})

//관리자 페이지 포스터 업로드 폼
router.get('/poster-upload', function(req, res) {
    res.render('writeBoard');
})

module.exports = router;