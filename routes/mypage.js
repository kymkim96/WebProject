const express = require('express');
const router = express.Router();
const { checkAdminPermission, adminCode, isLoggedIn } = require('./middlewares');

router.get('/', isLoggedIn, function(req, res, next) {
   if(req.user.admincode === adminCode.admincode ) {
      res.redirect('/adminpage');
   } else
      res.render('mypage');
});

module.exports = router;
