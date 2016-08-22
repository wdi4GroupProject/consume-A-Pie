module.exports = {
  renderHome: function(req, res) {
    res.render('static_pages/index');
  },
  // renderLogin: function(req, res) {
  //   res.render('static_pages/login.ejs', {
  //     message: req.flash('loginMessage')
  //   }); //render login page and login message
  // },
  // authLogin: function(){
  //   passport.authenticate('local-login', {
  //       successRedirect : '/profile',
  //       failureRedirect : '/login',
  //       failureFlash : true // allow flash messages
  //   });
  // },
  // renderSignup: function(req, res) {
  //   res.render('static_pages/signup.ejs', {
  //     message: req.flash('signupMessage')
  //   }); //render signup page and sign up message
  // },
  // doSignup: function(){
  //   passport.authenticate('local-signup', {
  //       successRedirect : '/profile',
  //       failureRedirect : '/signup',
  //       failureFlash : true // allow flash messages
  //   });
  // }


};
