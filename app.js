var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mustacheExpress = require('mustache-express');  //html 렌더링
var passport = require('passport');
const session = require('express-session');
require('dotenv').config();

//라우터, ORM, passport
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
var sequelize = require('./models').sequelize;
const passportConfig = require('./passport');

//mysql 연동
var app = express();
sequelize.sync();
passportConfig(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('port', process.env.PORT || 8001);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
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
