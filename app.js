var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
const session = require('express-session');
require('dotenv').config();

//라우터, ORM, passport
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const uploadRouter = require('./routes/upload');
const mypageRouter = require('./routes/mypage');
const adminRouter = require('./routes/adminpage');
const actRouter = require('./routes/poster-act');
const musicalRouter = require('./routes/poster-musical');
var sequelize = require('./models').sequelize;
const passportConfig = require('./passport');

//mysql 연동, passport 설정
var app = express();
sequelize.sync();
passportConfig(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8001);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/poster-act/page', express.static(path.join(__dirname, 'public')));
app.use('/poster-act/search', express.static(path.join(__dirname, 'public')));
app.use('/poster-act/detail', express.static(path.join(__dirname, 'public')));
app.use('/poster-act/review-upload', express.static(path.join(__dirname, 'public')));
app.use('/poster-musical/page', express.static(path.join(__dirname, 'public')));
app.use('/poster-musical/search', express.static(path.join(__dirname, 'public')));
app.use('/poster-musical/detail', express.static(path.join(__dirname, 'public')));
app.use('/poster-musical/review-upload', express.static(path.join(__dirname, 'public')));
app.use('/mypage', express.static(path.join(__dirname, 'public')));
app.use('/adminpage', express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/upload', uploadRouter);
app.use('/mypage', mypageRouter);
app.use('/adminpage', adminRouter);
app.use('/poster-act', actRouter);
app.use('/poster-musical', musicalRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
module.exports = app;
