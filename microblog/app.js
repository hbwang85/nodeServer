var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var flash = require('connect-flash');

var app = express();

/////////////////////////For express 4.0 and after/////////////////////////
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
/////////////////////////For express 4.0 and after/////////////////////////
var settings = require('./settings');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: settings.cookieSecret,
  store: new MongoStore({
  db: settings.db
})
}));

app.use(flash());

app.use(function(req, res, next){
  res.locals.user = req.session.user;
  res.locals.post = req.session.post;

  var error = req.flash('error');
  res.locals.error = error.length ? error : null;

  var success = req.flash('success');
  res.locals.success = success.length ? success : null;

  next();
});


app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//This is for Express before 4.x
//app.dynamicHelpers({
//  user: function(req, res){
//    return req.session.user;
//  },
//
//  error: function(req, res){
//    var err = req.flash('error');
//    if (err.length) {
//      return err;
//    } else {
//      return null;
//    }
//  },
//
//  success: function(req, res) {
//    var succ = req.flash('success');
//    if (succ.length) {
//      return succ;
//    } else {
//      return null;
//    }
//  },
//});


module.exports = app;
