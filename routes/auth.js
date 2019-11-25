var express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
var router = express.Router();
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');
const { User } = require('../models');

//회원가입 라우터
router.post('/signUp', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password, tlno} = req.body;
    try {
        const exUser = await User.findOne({where: {email}});
        if(exUser) {
            alert('이미 가입된 이메일입니다.');
            return res.redirect('/signUp');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email: email,
            nick: nick,
            password: hash,
            phoneNumber: tlno,
        });
        return res.redirect('/');
    } catch(error) {
        console.error(error);
        return next(error);
    }
});

//로그인 라우터
router.post('/signIn', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            alert(info.message);
            return res.redirect('/signIn');
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

//로그아웃 라우터
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/')
})

module.exports = router;
