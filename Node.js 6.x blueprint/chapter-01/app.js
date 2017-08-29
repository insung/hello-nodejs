var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

// add modules
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('connect-flash');

var index = require('./server/routes/index');
var users = require('./server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views/pages'));
app.set('view engine', 'ejs');

// db setup
var config = require('./server/config/config.js');
mongoose.connect(config.url);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running..');
});

// passport setup
require('./server/config/passport')(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// passport secret
app.use(session({
  secret: 'abcdefg',
  saveUninitialized: true,
  resave: true,
  
  // express-session 과 connect-mongo 를 이용해 mongo db 에 세션 저장
  store: new MongoStore({
    url: config.url,
    collection: 'sessions'
  })
}));

// passport init
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// route
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login page', message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res) {
  res.render('signup', { title: 'Signup page', message: req.flash('signupMessage') });
});

router.get('/profile', function(req, res, next) {
  res.render('profile', { 
    title: 'Profile page', 
    user: req.user, 
    avatar: gravatar.url(req.user.emaill, {s: '100', r: 'x', d: 'retro'}, true) }
  );
});

app.set('port', process.env.PORT || 3001);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});