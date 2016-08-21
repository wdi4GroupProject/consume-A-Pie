// INITIALIZER
var config = require('./config'),
  express = require('express'),
  passport = require('passport'),
  flash = require('connect-flash'),
  morgan = require('morgan'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  expressLayouts = require('express-ejs-layouts');

module.exports = function() {
  var app = express();
  require('./passport')(passport); // pass passport for configuration

  // initialize the required module
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended: false
  })); // get information from html
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser()); // read cookies (needed for auth)

  // required for passport
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session

  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  app.use(expressLayouts);

  // routes
  require('../app/routes/app.routes')(app, passport); // load our routes and pass in our app and fully configured passport
  require('../app/routes/recipes.routes')(app);
  require('../app/routes/meal.routes')(app);

  app.use(express.static('./public'));

  return app;
};
