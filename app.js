require("dotenv").config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require("./database/database")
const flash = require("connect-flash")
const hbs  = require("hbs")
var home = require('./routes/home');
var auth = require('./routes/auth');
var crud = require('./routes/crud');
var api = require('./routes/api');

const passport = require("passport")
const session = require("express-session")

require("./helpers/passport")
var app = express();

hbs.registerPartials(path.join(__dirname, "views/partials"))

app.use(flash())

db()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:"secret",
  resave:true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next) {

  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  app.locals.user = req.user
  next();
});



app.use('/', home);
app.use('/auth', auth);
app.use('/crud', crud);
app.use('/api', api);

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

module.exports = app;
