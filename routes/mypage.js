const express = require('express');
const router = express.Router();
const { checkAdminPermission, adminCode } = require('./middlewares');

router.get('/', function(req, res, next) {
   console.log('여기로 잘들어온건가요...?');
   if(req.user.admincode === adminCode.admincode ) {
      res.redirect('/adminpage');
   } else
      res.render('mypage');
});

module.exports = router;
