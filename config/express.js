// INITIALIZER
var config = require('./config'),
  express = require('express'),
  passport = require('passport'),
  flash = require('connect-flash'),
  morgan = require('morgan'),
  compress = require('compression'),
  methodOverride = require('method-override'),
  expressJWT = require('express-jwt'),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  jwt = require('jsonwebtoken'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  expressLayouts = require('express-ejs-layouts');
var jwt_secret = 'wdi4team5jwtsecret';


module.exports = function() {
  var app = express();
  require('./passport')(passport); // pass passport for configuration
  //cors
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
  //jwt setup
  // app.use(expressJWT({
  //     secret: jwt_secret
  //   })
  //   .unless({
  //     path: ['/signup',
  //       '/login',
  //       '/API/login',
  //       '/API/signup',
  //       '/',
  //       '/profile',
  //       '/recipe',
  //       '/recipe/new',
  //       '/logout',
  //       '/auth/google',
  //       '/auth/google/callback',
  //       '/auth/facebook',
  //       '/auth/facebook/callback',
  //       '/auth/twitter',
  //       '/auth/twitter/callback',
  //       '/auth/github',
  //       '/auth/github/callback',
  //       '/connect/google',
  //       '/connect/google/callback',
  //       '/connect/facebook',
  //       '/connect/google/callback',
  //       '/connect/facebook',
  //       '/connect/facebook/callback',
  //       '/connect/twitter',
  //       '/connect/twitter/callback',
  //       '/connect/github',
  //       '/connect/github/callback',
  //       '/unlink/google',
  //       '/unlink/facebook',
  //       '/unlink/twitter',
  //       '/unlink/github'
  //     ]
  //   })
  // );
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
  require('../app/routes/authen_api.routes')(app, passport);
  require('../app/routes/recipes.routes')(app);
  require('../app/routes/users.routes')(app);
  require('../app/routes/meal.routes')(app);
  require('../app/routes/index.routes')(app);
  app.use(express.static('./public'));

  return app;
};
