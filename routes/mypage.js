const express = require('express');
const router = express.Router();
const { checkAdminPermission, adminCode } = require('./middlewares');

router.get('/', function(req, res, next) {
   if(req.user.admincode === adminCode.admincode ) {
      res.redirect('/adminpage');
   } else
      res.render('mypage');
});

module.exports = router;
