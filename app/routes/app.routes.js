module.exports = function(app, passport) {
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

//google authorization
app.get('/connect/google',passport.authorize('google',{
  scope:['profile','email']}));
app.get('/connect/google/callback',passport.authorize('google',{
  successRedirect:'/profile',
  failureRedirect:'/'
}));
//facebook authorization
app.get('/connect/facebook',passport.authorize('facebook',{
  scope:'email'}));
app.get('/connect/facebook/callback',passport.authorize('facebook',{
  successRedirect:'/profile',
  failureRedirect:'/'
}));
//twitter authorization
app.get('/connect/twitter',passport.authorize('twitter',{
  scope:'email'}));
app.get('/connect/twitter/callback',passport.authorize('twitter',{
  successRedirect:'/profile',
  failureRedirect:'/'
}));
//github authorization
app.get('/connect/github',passport.authorize('github',{
  scope:'email'}));
app.get('/connect/github/callback',passport.authorize('github',{
  successRedirect:'/profile',
  failureRedirect:'/'
}));

//unlink account
//google
app.get('/unlink/google',function(req,res){
  var user = req.user;
  user.google.token = undefined;
  user.save(function(err){
    if(err) return done(err);
    res.redirect('/profile');
  });
});
//facebook
app.get('/unlink/facebook',function(req,res){
  var user = req.user;
  user.facebook.token = undefined;
  user.save(function(err){
    if(err) return done(err);
    res.redirect('/profile');
  });
});
//twitter
app.get('/unlink/twitter',function(req,res){
  var user = req.user;
  user.twitter.token = undefined;
  user.save(function(err){
    if(err) return done(err);
    res.redirect('/profile');
  });
});
//github
app.get('/unlink/github',function(req,res){
  var user = req.user;
  user.github.token = undefined;
  user.save(function(err){
    if(err) return done(err);
    res.redirect('/profile');
  });
});




};

function loggedIn(req, res, next) {
  // if user is authenticated in the session
  if (req.isAuthenticated())
    return next();

  // else redirect them to the home page
  res.redirect('/');
}
