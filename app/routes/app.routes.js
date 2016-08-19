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

//Google login
app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
//callback to redirect user once the user has authenticated
app.get('/auth/google/callback',passport.authenticate('google',{
  successRedirect:'/profile',
  failureRedirect:'/'
}));

//FACEBOOK
app.get('/auth/facebook',passport.authenticate('facebook',{scope:'email'}));
app.get('/auth/facebook/callback',passport.authenticate('facebook',{
  successRedirect: '/profile',
  failureRedirect:'/'
}));

//TWITTER
app.get('/auth/twitter',passport.authenticate('twitter'));
app.get('/auth/twitter/callback',passport.authenticate('twitter',{
  successRedirect:'/profile',
  failureRedirect:'/'
}));

//github
app.get('/auth/github',passport.authenticate('github',{scope:'email'}));
app.get('/auth/github/callback',passport.authenticate('github',{
  successRedirect: '/profile',
  failureRedirect:'/'
}));



};

function loggedIn(req, res, next) {
  // if user is authenticated in the session
  if (req.isAuthenticated())
    return next();

  // else redirect them to the home page
  res.redirect('/');
}
