module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('static_pages/index.ejs');
  });
  app.route('/login')
    .get(function(req, res) {
      res.render('static_pages/login.ejs', {
        message: req.flash('loginMessage')
      }); //render login page and login message
    })
    .post(passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true // allow flash messages
    }));

  app.route('/signup')
    .get(function(req, res) {
      res.render('static_pages/signup.ejs', {
        message: req.flash('signupMessage')
      }); //render signup page and sign up message
    })
    .post(passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true // allow flash messages
    }));

app.get('/profile', loggedIn, function(req, res) {
  res.render('users/profile.ejs', {
    user: req.user //get the user out of session and pass to the page
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

};

function loggedIn(req, res, next) {
  // if user is authenticated in the session
  if (req.isAuthenticated())
    return next();

  // else redirect them to the home page
  res.redirect('/');
}
